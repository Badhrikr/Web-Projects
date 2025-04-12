interface HeadingRoutesProps {
    routes: Array<HeadingRoutes>;
}

interface HeadingRoutes {
    routerText: string;
    routerLink: string;
    routerIcon?: JSX.Element;
}

export type { HeadingRoutes, HeadingRoutesProps }