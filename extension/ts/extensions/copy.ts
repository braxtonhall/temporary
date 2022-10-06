import {showToast, ToastType} from "../ui/toast";
import {FORM_RENDER_EVENT} from "../services/renderFormObserver";
import {getFormElements} from "../util/bookForm";

const COLLECTIONS_ID_PREFIX = "collection_u_";
const SAVE_DATA_KEY = "_save-data";
const COLLECTIONS_KEY = "___collections_";

type SaveData = Record<string, Record<string, any>>;

const saveData = (event: Event) => {
	event.preventDefault();
	localStorage.setItem(SAVE_DATA_KEY, JSON.stringify(getSaveData()));
	showToast(
		"The metadata for this book was saved!\n\nYou can use the Paste button on a different book's page to paste in your saved metadata.",
		ToastType.SUCCESS
	);
};

const loadData = (event: Event) => {
	event.preventDefault();
	try {
		const saveData = JSON.parse(localStorage.getItem(SAVE_DATA_KEY) ?? "{}");
		insertSaveData(saveData);
	} catch (e) {
		console.error(e);
		showToast("Something went wrong when trying to paste metadata :/", ToastType.ERROR);
	}
};

const getSaveData = () => {
	const elements = getFormElements();
	return elements.reduce((saveData: SaveData, element: any) => {
		// We can't change hidden elements because LibraryThing relies
		// on hidden form inputs to send additional, form-specific metadata
		// on save
		if (element && element.id && element.type !== "hidden") {
			const {value, checked} = element;
			if (element.id.startsWith(COLLECTIONS_ID_PREFIX)) {
				const collections = saveData[COLLECTIONS_KEY] || {};
				const [span] = element.parentElement.getElementsByTagName("span");
				collections[span.textContent] = {value, checked};
				saveData[COLLECTIONS_KEY] = collections;
			} else {
				saveData[element.id] = {value, checked};
			}
		}
		return saveData;
	}, {});
};

const insertSaveData = (saveData: SaveData) => {
	const elements = getFormElements();
	return elements.forEach((element: any) => {
		// We can't change hidden elements because LibraryThing relies
		// on hidden form inputs to send additional, form-specific metadata
		// on save
		if (element && element.id && element.type !== "hidden") {
			let saveElement;
			if (element.id.startsWith(COLLECTIONS_ID_PREFIX)) {
				const span = element.parentElement.getElementsByTagName("span")[0];
				saveElement = saveData[COLLECTIONS_KEY][span.textContent] || element;
			} else {
				saveElement = saveData[element.id] || element;
			}
			element.value = saveElement.value;
			element.checked = saveElement.checked;
			element.dispatchEvent(new Event("change"));
		}
	});
};

const appendButton = (element: HTMLElement, text: string, onClick: (event: Event) => void) => {
	const button = document.createElement("button");
	button.innerHTML = text;
	button.addEventListener("click", onClick);
	const td = document.createElement("td");
	td.appendChild(button);
	element.appendChild(td);
};

const appendRow = (table: HTMLTableElement) => {
	const row = document.createElement("tr");
	appendButton(row, "Copy book", saveData);
	appendButton(row, "Paste book", loadData);
	const [body] = Array.from(table.getElementsByTagName("tbody"));
	body.appendChild(row);
};

window.addEventListener(FORM_RENDER_EVENT, () => {
	Array.from(document.getElementsByClassName("book_bitTable")).forEach(appendRow);
});
