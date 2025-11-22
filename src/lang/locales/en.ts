export default {
    // Commands
    cmd_open_panel: 'Open Side Panel',
    cmd_force_sync: 'Force Sync Now',
    cmd_debug_connect: 'Debug: Test Connection',

    // Ribbon Icon
    ribbon_tooltip: 'Open Syncthing Controller',

    // Status / View
    status_synced: 'Synced',
    status_syncing: 'Syncing...',
    status_offline: 'Offline',
    status_error: 'Error',
    status_unknown: 'Unknown',
    
    info_last_sync: 'Last Sync',
    info_devices: 'Online Devices',
    info_folder: 'Vault Folder',
    btn_sync_now: 'Sync Now',
    btn_requesting: 'Requesting...',

    // Settings - Headers
    setting_header_conn: 'Connection Settings',
    setting_header_folder: 'Folder & Files',
    setting_header_interface: 'Interface Options',
    setting_header_general: 'General',

    // Settings - General
    setting_lang_name: 'Language',
    setting_lang_desc: 'Force the plugin interface to a specific language or follow Obsidian.',

    // Settings - Connection
    setting_https_name: 'Use HTTPS',
    setting_https_desc: 'IMPORTANT: Keep this DISABLED for Android/Mobile to work correctly, It should also be disabled in syncthing. Only enable if you have configured a valid TLS certificate on your Desktop.',
    setting_host_name: 'IP Address / Host',
    setting_host_desc: 'The address where Syncthing GUI is running. Use "127.0.0.1" for localhost.',
    setting_port_name: 'Port',
    setting_port_desc: 'Default is 8384. Check your Syncthing GUI settings if you changed it.',
    setting_api_name: 'API Key',
    setting_api_desc: 'Copy this from Syncthing > Actions > Settings > General.',
    btn_test_conn: 'Test Connection',
    
    // Settings - Folder
    setting_folder_name: 'Vault Folder ID',
    setting_folder_desc: 'Select the Syncthing folder ID that matches this Obsidian Vault to track its specific status.',
    dropdown_default: 'Select a folder...',
    dropdown_none: 'No folder selected',
    btn_search_folders: 'Fetch folders from Syncthing',
    
    // Settings - Conflict
    setting_modal_conflict_name: 'Conflict Detection',
    setting_modal_conflict_desc: 'Enable automatic scanning for ".sync-conflict" files. A red alert will appear in the Side Panel if conflicts are found.',

    // Settings - Interface
    setting_status_bar_name: 'Show Status Bar Item',
    setting_status_bar_desc: 'Displays the connection icon and quick actions in the bottom right status bar (Desktop only). Restart Obsidian to apply.',
    setting_ribbon_name: 'Show Ribbon Icon',
    setting_ribbon_desc: 'Displays the icon in the left sidebar ribbon to quickly open the controller panel. Restart Obsidian to apply.',

    // Notices / Errors
    notice_syncing: 'Sync requested...',
    notice_success_conn: 'Connection Successful! Device ID: ',
    notice_fail_conn: 'Connection Failed. Please check the IP, Port, and ensure HTTPS is disabled (especially on Android).',
    notice_error_auth: 'Authentication Failed. Please check your API Key.',
    notice_offline: 'Syncthing is unreachable. Is it running?',
    notice_folders_found: 'folders found.',
    notice_config_first: 'Please configure the API Key and URL first.',
    notice_searching: 'Connecting to Syncthing...',

    // Conflict Modal
    modal_conflict_title: 'Resolve Sync Conflicts',
    modal_conflict_empty: 'Great news! No conflict files found in your vault.',
    modal_conflict_desc: 'The following files have conflicting versions. Compare the content and choose which one to keep.',
    btn_compare: 'Compare Content',
    btn_keep_original: 'Keep Original',
    tooltip_keep_original: 'Deletes the conflict file (right side) and keeps your current local file.',
    btn_keep_conflict: 'Use Conflict Version',
    tooltip_keep_conflict: 'Overwrites your local file with the conflict version (right side).',
    
    // Diff View
    diff_original_header: 'Current File (Original)',
    diff_conflict_header: 'Incoming Conflict',
    diff_loading: 'Loading file content...',
    diff_original_missing: '(Original file was deleted or not found)',
    diff_read_error: 'Error reading file content.',

    // Ignore (.stignore)
    setting_ignore_name: 'Ignored Files (.stignore)',
    setting_ignore_desc: 'Edit the .stignore file to prevent specific files (like workspace layouts) from syncing between devices.',
    btn_edit_ignore: 'Edit .stignore',
    
    // Ignore Modal
    modal_ignore_title: 'Edit .stignore',
    modal_ignore_desc: 'Files or patterns listed below will be completely ignored by Syncthing.',
    header_ignore_templates: 'Quick Add Templates:',
    btn_add_ignore: 'Add',
    btn_save_ignore: 'Save Changes',
    notice_ignore_saved: '.stignore file saved successfully.',
    notice_ignore_exists: 'This rule is already in the list.',

    // Conflict Alert (View)
    alert_conflict_detected: 'Conflict(s) Detected!',
    alert_click_to_resolve: 'Click here to resolve',
};