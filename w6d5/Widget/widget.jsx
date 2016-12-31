import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from './tabs';

const tabData = [{ title: "One", content: "I am the first"}, { title: "Two", content: "I am the second"}];

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<Tabs tabs={tabData}/>, root);
});
