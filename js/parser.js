/*parser.js*/

const regexTopic = /(?:^# )(.*)/
const regexQuestion = /(?:^## )(.*)/

const DOCUMENT_START = {
	value: null,
	nextNode: null,
	position: -1,
	type: "DOCUMENT_START"
}

const DOCUMENT_END = {
	value: null,
	nextNode: null,
	position: -1,
	type: "DOCUMENT_END"
}

/**
 * @param  {string} content to parse
 * @returns {array} topics
 */
function parseTopics(str) {
	const lines = str.split(/\r?\n/);

	const topics = [];
	let nextNode = DOCUMENT_START;
	do {
		if(nextNode.type == "Topic") {
  			const result = parseTopicContent(lines, nextNode);
        	
        	topics.push(result.value);

        	nextNode = result.nextNode;
    	} else {
    		nextNode = searchNextNode(lines, nextNode.position + 1)
    	}
	} while (nextNode != DOCUMENT_END) 
	return topics;
}

function parseTopicContent(lines, topicNode) {
	const questions = [];
	let nextNode = topicNode
	do {
		if (nextNode.type == "Question") {
			const result = parseQuestionContent(lines, nextNode)
			
			questions.push(result.value)
			
			nextNode = result.nextNode
		} else {
			nextNode = searchNextNode(lines, nextNode.position+1);
		}
	} while(!(nextNode == DOCUMENT_END || nextNode.type == "Topic")) 
	return { 
		value: {
			name: topicNode.value,
			questions: questions
		}, 
		nextNode: nextNode 
	}
}

function parseQuestionContent(lines, questionNode) {
	let buffer = ""
	let nextNode = questionNode
	do {
		if (nextNode.type == "Text") {
			const result = parseTextContent(lines, nextNode);
			
			buffer += result.value;
			
			nextNode = result.nextNode;
		} else {
			nextNode = searchNextNode(lines, nextNode.position + 1);	
		}
	} while(!(nextNode == DOCUMENT_END || 
		nextNode.type == "Topic" || 
		nextNode.type == "Question"))
	return {
		value: {
			question: questionNode.value,
			answer: buffer
		},
		nextNode: nextNode
	}
}

function parseTextContent(lines, textNode) {
	return {
		value: textNode.value,
		nextNode: searchNextNode(lines, textNode.position + 1)
	}
}


function searchNextNode(lines, start) {
	for(let i = start; i < lines.length; i++) {
		if (lines[i]) lines[i] += "<br>";
		const line = lines[i];
		let match = regexQuestion.exec(line);
		if (match) return {
			value:  match[1].trim(),
			position: i,
			type: "Question"
		} 
		match = regexTopic.exec(line);
		if (match) return {
			value:  match[1].trim(),
			position: i,
			type: "Topic"
		}
		return {
			value: line,
			position: i,
			type: "Text"
		}

	}
	return DOCUMENT_END;
}


