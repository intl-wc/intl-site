import { createProviderConsumer } from '@stencil/state-tunnel';

export interface Annotation {
    line: number,
    text: string;
}
export interface File {
    filename: string,
    language: string,
    content: string,
    annotations: Annotation[]
    markup?: string
}

export interface State {
    currentFile: File,
    openFile: (filename: string) => Promise<void>,
    getFile: (filename: string) => Promise<File>,
    gettingFile: boolean
}

export default createProviderConsumer<State>({
    currentFile: null,
    openFile: () => Promise.resolve(),
    getFile: () => Promise.resolve(null),
    gettingFile: false
},
    (subscribe, child) => (
        <context-consumer subscribe={subscribe} renderer={child} />
    )
);