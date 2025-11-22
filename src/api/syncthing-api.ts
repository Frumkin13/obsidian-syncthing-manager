import { requestUrl, RequestUrlParam } from 'obsidian';

export class SyncthingAPI {
    
    // --- System Status & Config ---

    static async getStatus(url: string, apiKey: string): Promise<any> {
        return this.request(url, apiKey, '/rest/system/status');
    }

    static async getConnections(url: string, apiKey: string): Promise<any> {
        return this.request(url, apiKey, '/rest/system/connections');
    }

    static async getFolders(url: string, apiKey: string): Promise<any[]> {
        const config = await this.request(url, apiKey, '/rest/config');
        return config.folders;
    }

    // --- Folder Operations ---

    static async getFolderStats(url: string, apiKey: string, folderId: string): Promise<any> {
        return this.request(url, apiKey, `/rest/db/status?folder=${folderId}`);
    }

    static async forceScan(url: string, apiKey: string, folderId?: string): Promise<any> {
        let endpoint = '/rest/db/scan';
        
        if (folderId) {
            endpoint += `?folder=${folderId}`;
        }
        
        return this.request(url, apiKey, endpoint, 'POST'); 
    }

    // --- HTTP Helper ---

    private static async request(url: string, apiKey: string, endpointPath: string, method: string = 'GET'): Promise<any> {
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
                    return response.json;
                } catch {
                    return response.text;
                }
            }
            return {};
        } else {
            throw new Error(`HTTP Error ${response.status}: ${endpointPath}`);
        }
    }
}