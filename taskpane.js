/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word */


Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
	console.log("Smartpat add-in is ready!");
  }
});

async function run() {
	return Word.run(async (context) => {
	  /**
	   * Insert your Word code here
	   */
  
	  var document=context.document;
	  document.properties.load("title");
	  await context.sync();
	  var title=document.properties.title;
	  var bookmarks = context.document.body.getRange().getBookmarks();
	  await context.sync();
	  
	  console.log("Title: ",title);
	  
	  
	  console.log("Bookmarks: ",bookmarks.value.length);
	  console.log("Title:",title);
  
  
	  // Assignment - Declaration Form
	  if (title.includes("SP001")){
		  var type=context.document.getBookmarkRange("Type");
		  var count=context.document.getBookmarkRange("Count");
		  var appno=context.document.getBookmarkRange("Application");
		  type.load('text');
		  count.load('text');
		  appno.load('text');
		  await context.sync();
	  
		  console.log("Type: ",type);
		  console.log(type.text);
		  console.log("Count: ",type);
		  console.log(count.text,parseInt(count.text));
		  console.log(appno);
		  
		  // Set alternatives based on text
	  
		  if (type.text.includes("Utility")){
			  var alt1="Option_C"	
		  }
		  if (type.text.includes("Design")){
			  var alt1="Option_D"	
		  }
		  
		  let i = 0;
	  
		  if (parseInt(count.text)>1){
			  var alt2="Option_A"	
		  }
		  else {
			  var alt2="Option_B"	
		  }
		  
		  if (appno.text.includes("PCT")){
			  var alt3="ApplicationType_US"	
		  }
		  else {
			  var alt3="ApplicationType_PCT"	
		  }
		  
		  console.log("Selected alternatives: ",alt1, alt2,alt3);
		  
		  while (i < bookmarks.value.length) {
			  console.log(bookmarks.value[i]);
			  if (bookmarks.value[i].includes(alt1) || bookmarks.value[i].includes(alt2)|| bookmarks.value[i].includes(alt3)) {
				  console.log("Now deleting ",bookmarks.value[i],alt1);
				  var range=context.document.getBookmarkRange(bookmarks.value[i]).delete();
			  }
			  i++;
		  }	
	  }
  
	  
	  // Auftragsbestätigung
	  if (title.includes("SP002")){
		  var appno=context.document.getBookmarkRange("ApplicationNum");
		  var conflict=context.document.getBookmarkRange("Conflict");
		  var entity=context.document.getBookmarkRange("Entity");
		  appno.load('text');
		  conflict.load('text');
		  entity.load('text');
		  await context.sync();
		  console.log("Application No. ",appno.text);
		  console.log("Conflict",conflict.text);
		  console.log("entity. ",entity.text);
		  
		  // Set alternatives based on text
	  
		  if (appno.text.includes("PCT")){
			  // Make PCT, delete Paris
			  var alt1="Paris"	
		  } else {
			  var alt1="PCT"	
		  }
		  
		  if (conflict.text.length>5){
			  // Delete the wrong one...
			  var alt2="NoConflict"	
		  } else {
			  var alt2="HasConflict"	
		  }
		  
		  if (entity.text.includes("Small")){
			  // Make PCT, delete Paris
			  var alt3="Large"	
		  } else {
			  var alt3="Small"	
		  }
	  
		  console.log("Selected alternatives = will delete: ",alt1);
		  let i = 0;
		  while (i < bookmarks.value.length) {
			  console.log(bookmarks.value[i]);
			  if (bookmarks.value[i].includes(alt1)|| bookmarks.value[i].includes(alt2)|| bookmarks.value[i].includes(alt3)) {
				  console.log("Now deleting ",bookmarks.value[i],alt1,alt2,alt3);
				  var range=context.document.getBookmarkRangeOrNullObject(bookmarks.value[i]);
				  range.load("text");
				  await context.sync();
				  console.log(range.text);
				  range.delete();
				  console.log(range);
				  await context.sync();
			  }
			  i++;
		  }	
	  }
	  
	  
	// Load objects for display in Script Lab console.
	await context.sync();
  
	});
  }
  