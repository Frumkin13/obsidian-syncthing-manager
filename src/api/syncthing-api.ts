import { requestUrl, RequestUrlParam } from 'obsidian';

// --- Interfaces de Tipagem ---
export interface SyncthingStatus {
    myID: string;
    alloc: number;
    cpuPerf: number;
}

export interface SyncthingFolder {
    id: string;
    label: string;
    path: string;
    type: string;
}

export interface SyncthingConfig {
    folders: SyncthingFolder[];
}

export interface SyncthingFolderStats {
    state: string;
    needBytes: number;
    needItems: number;
}

export interface SyncthingConnection {
    connected: boolean;
    inBytesTotal: number;
    outBytesTotal: number;
}

export interface SyncthingConnectionsResponse {
    connections: Record<string, SyncthingConnection>;
    total: SyncthingConnection;
}

export class SyncthingAPI {
    
    // --- System Status & Config ---

    static async getStatus(url: string, apiKey: string): Promise<SyncthingStatus> {
        return this.request<SyncthingStatus>(url, apiKey, '/rest/system/status');
    }

    static async getConnections(url: string, apiKey: string): Promise<SyncthingConnectionsResponse> {
        return this.request<SyncthingConnectionsResponse>(url, apiKey, '/rest/system/connections');
    }

    static async getFolders(url: string, apiKey: string): Promise<SyncthingFolder[]> {
        const config = await this.request<SyncthingConfig>(url, apiKey, '/rest/config');
        return config.folders;
    }

    // --- Folder Operations ---

    static async getFolderStats(url: string, apiKey: string, folderId: string): Promise<SyncthingFolderStats> {
        return this.request<SyncthingFolderStats>(url, apiKey, `/rest/db/status?folder=${folderId}`);
    }

    static async forceScan(url: string, apiKey: string, folderId?: string): Promise<void> {
        let endpoint = '/rest/db/scan';
        
        if (folderId) {
            endpoint += `?folder=${folderId}`;
        }
        
        await this.request<void>(url, apiKey, endpoint, 'POST'); 
    }

    // --- HTTP Helper ---

    private static async request<T>(url: string, apiKey: string, endpointPath: string, method: string = 'GET'): Promise<T> {
        const baseUrl = url.replace(/\/$/, '');
        const endpoint = `${baseUrl}${endpointPath}`;

        const params: RequestUrlParam = {
            url: endpoint,
            method: method,
            headers: { 'X-API-Key': apiKey }
        };

        const response = await requestUrl(params);

        if (response.status === 200) {
            // Handle Empty/Text responses vs JSON responses
            if (response.text && response.text.length > 0) {
                try {
                    return response.json as T;
                } catch {
                    return {} as T;
                }
            }
            return {} as T;
        } else {
            throw new Error(`HTTP Error ${response.status}: ${endpointPath}`);
        }
    }
}