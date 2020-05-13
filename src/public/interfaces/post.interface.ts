interface IPost {
    _id: string | undefined;
    title: string;
    createdBy: string;
    lastEdited: string;
    tags: Array<string>;
    selectedTags: Array<string>;
    content: string;
}

export default IPost;