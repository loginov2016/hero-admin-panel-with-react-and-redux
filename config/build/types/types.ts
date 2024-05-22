export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'mobile' | 'desktop';


export interface BuildPaths {
    entry: string;
    html: string;
    output: string;
}

export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    platform: BuildPlatform;

}