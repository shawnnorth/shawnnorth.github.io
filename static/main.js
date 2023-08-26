/*

 Main interactions for JSON search

 */

"use strict";

(function () {

let xhr;
let models = {};
let btn = document.getElementById("searcher");
let field = document.getElementById("mname");
let findings = document.getElementById("results");

function start_search() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = search;
    xhr.open("GET", "/models.json");
    xhr.send();
}

function search() {
    var query = field.value.toLowerCase();
    if (query.length < 4) {
        findings.innerHTML = "<p>At least 4 characters to search.</p>";
        return;
    }
    var match_list = [];
    if (xhr.readyState === 4 && xhr.status === 200) {
        models = JSON.parse(xhr.responseText).images;
        window.a = JSON.parse(xhr.responseText);

        // yes, a boring loop.
        for (let i = 0; i < models.length; i++) {
            if (models[i].name.toLowerCase().indexOf(query) != -1) {
                console.log("Found match: " + models[i].name);
                match_list.push(models[i]);
            }
        }

        if (match_list.length > 0) {
            findings.innerHTML = '<p>Found the following models:</p>';
            for (let i = 0; i < match_list.length; i++) {
                findings.innerHTML += '<p><a href="' + 
                    match_list[i].page + 
                    '">' + match_list[i].name +
                    "</a></p>";
            }
        }
        else {
            findings.innerHTML = "<p>Not found for this name</p>"
        }
    }
}

function tellcontent() {
    console.log("Input value is: " + field.value);
}

btn.addEventListener("click", start_search);
// field.addEventListener("change", start_search);
// field.addEventListener("change", tellcontent);

document.addEventListener("keydown", start_search);

}())
