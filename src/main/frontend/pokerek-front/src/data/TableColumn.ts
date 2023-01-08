export class TableColumn<T> {
    readonly header: string;
    readonly renderColumn: (item: T) => any;
    readonly sortKey?: string;

    public constructor(
        header: string,
        renderColumn: (item: T) => any,
        sortKey?: string
    ) {
        this.header = header;
        this.renderColumn = renderColumn;
        this.sortKey = sortKey;
    }
}