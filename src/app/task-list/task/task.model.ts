export class Task {
    constructor(
        public requestDate: Date,
        public ko: string,
        public municipality: string,
        public parcelNumber: string,
        public submitter: string,
        public tel: string,
        public predCulture: string,
        public culture: string
    ) {}
}
