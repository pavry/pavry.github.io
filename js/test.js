// test.js
function assertEquals(expected, actual, message) {
    const msg = message ? ` ${message}.` : ""
    
    if(expected !== actual) throw new Error( 
        `expected="${expected}", actual="${actual}".` + msg);
}
function runAllTests(){
    console.log("======== Run tests =========")
    Object.getOwnPropertyNames(this).forEach(name => {
      if (typeof this[name] === 'function' && name.startsWith("test_")) {
        try {
        	this[name]()
        	console.log("Test " + name.replace("test_","") + " passed");
    	} catch (err) {
    		if (err instanceof  ReferenceError) {
    			console.error("Test " + name.replace("test_","") + " failed");
    			console.error(err);
    		} else {
    			console.error("Test " + name.replace("test_","") + " failed: " + err);
    		}
    	}
      }
    })
    console.log("==== Tests run finished ====")
}

function disabled_test_of_test(){
	assertEquals(2, 2)
}

// utils.js

function todo(msg) {
	throw Error(`Not implemented: ${msg}`)
}

// Example usage:
const qaArray = [
    {   
        name: "topic 1",
        questions : [
            { question: "What is your name?", answer: "I am ChatGPT." },
            { question: "How are you?",       answer: "I'm doing great!" }
        ]
    },
    { 
        name: "Topic Super 2",
        questions: [
            { question: "sdadads?",           answer: "I am ChatGPT. And I know it." },
            { question: "How are you?",       answer: "I'm doing worse as ever!" }
        ]
    }
];

assertEquals(qaArray[1].questions[0].question, "sdadads?")


const testSample = `

# Test Sample

## 1 What is git checkout?

- The git checkout command lets you navigate between the branches created by git branch
- And this is good
- And this is good 2

## 2 What is git branch?

Hehehe
- Show all ## branch
Yo!

## 3 Really?

#         Topic 2     

No

## 4 Really?

Yes Okay :D

ajsdlkjasdlkjaldkja
The END!!!
`


/****************************************************************/
/*                                                              */
/*          T E S T S                                           */
/*                                                              */
/****************************************************************/


function test_topics_number_is_correct() {
	const topics = parseTopics(testSample);
	console.dir(topics)
	assertEquals(2, topics.length);
}

function test_topic_name() {
	assertEquals("Topic 2", parseTopics(testSample)[1].name)
}

function test_topic_contains_correct_number_of_questions() {
	assertEquals(3, parseTopics(testSample)[0].questions.length)
}

runAllTests()