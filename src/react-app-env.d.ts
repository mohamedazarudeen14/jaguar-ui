/// <reference types="react-scripts" />

interface JaguarConfig {
    API_BASE_URL: string
}

interface Window {
    env: JaguarConfig
}
