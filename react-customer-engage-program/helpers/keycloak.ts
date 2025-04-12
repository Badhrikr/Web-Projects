import Keycloak from 'keycloak-js';

export const keycloakConfig = {
    url: process.env.NEXT_PUBLIC_SSO_BASE_PATH,
    realm: "KumaranSSO",
    clientId: "DCEP-Application",
}

export const keycloakInitOptions = {
    responseMode: "fragment",
    flow: "standard",
    onLoad: "check-sso",
    pkceMethod: "S256",
    checkLoginIframe: false,
}

export const keycloakInstance: any = typeof window !== "undefined" ? new Keycloak(keycloakConfig) : {};
