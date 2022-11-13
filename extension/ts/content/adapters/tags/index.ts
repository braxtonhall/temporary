import {TagSearchOptions, TagTree} from "./types";
import {getTagTree} from "./getTags";

const getAncestry = (tag: string, tree: TagTree): string[] => {
	const ancestry = [];
	for (let node = tree.get(tag.toLowerCase()); node; node = node.parent) {
		ancestry.push(node.tag);
	}
	return ancestry;
};

const getTagList = async (options: TagSearchOptions = {noCache: false}) => {
	const nodes = (await getTagTree(options)).values();
	const tags = [...nodes].map((node) => node.tag);
	return new Set(tags);
};

const tagMatches = (search: string, match: RegExp) => (tag: string) =>
	tag.length > search.length && tag.toLowerCase().includes(search) && match.test(tag);

const getTagsIncluding = async (
	search: string,
	{noCache = false, match = /.*/}: {noCache?: boolean; match?: RegExp} = {}
): Promise<string[]> => {
	const tags = await getTagList({noCache});
	const lowerSearch = search.toLowerCase();
	const allTags = [...tags.values()];
	const matchingTags = allTags.filter(tagMatches(lowerSearch, match));
	return matchingTags.sort();
};

export type {TagTree};
export {getAncestry, getTagList, getTagsIncluding, getTagTree};
