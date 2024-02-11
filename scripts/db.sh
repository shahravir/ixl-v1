#!/bin/bash

# MongoDB script file
mongo_script_file="mongodb_script.js"

# MongoDB connection parameters
host="localhost"
port="27017"
database="your_database_name"

# MongoDB script content
cat > $mongo_script_file <<EOF
use $database;

// Users collection
// Users collection
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "password", "account_type"],
      properties: {
        username: {
          bsonType: "string",
          description: "Username of the user"
        },
        email: {
          bsonType: "string",
          description: "Email address of the user"
        },
        password: {
          bsonType: "string",
          description: "Password of the user"
        },
        account_type: {
          bsonType: "string",
          description: "Type of the account (e.g., student, teacher, admin)"
        },
        // Other user-related properties can be added here
      }
    }
  }
});

// Subjects collection
db.createCollection("subjects", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["subject_name"],
      properties: {
        subject_name: {
          bsonType: "string",
          description: "Name of the subject"
        },
        description: {
          bsonType: "string",
          description: "Description of the subject"
        }
        // Other subject-related properties can be added here
      }
    }
  }
});

// Skills collection
db.createCollection("skills", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["skill_name", "subject_id"],
      properties: {
        skill_name: {
          bsonType: "string",
          description: "Name of the skill"
        },
        description: {
          bsonType: "string",
          description: "Description of the skill"
        },
        subject_id: {
          bsonType: "objectId",
          description: "Reference to the subject that this skill belongs to"
        }
        // Other skill-related properties can be added here
      }
    }
  }
});

// Questions collection
db.createCollection("questions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["question_text", "skill_id", "correct_answer"],
      properties: {
        question_text: {
          bsonType: "string",
          description: "Text of the question"
        },
        skill_id: {
          bsonType: "objectId",
          description: "Reference to the skill associated with this question"
        },
        correct_answer: {
          bsonType: "string",
          description: "Correct answer to the question"
        }
        // Other question-related properties can be added here
      }
    }
  }
});

// User Progress collection
db.createCollection("user_progress", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "skill_id", "progress_status"],
      properties: {
        user_id: {
          bsonType: "objectId",
          description: "Reference to the user who made progress"
        },
        skill_id: {
          bsonType: "objectId",
          description: "Reference to the skill for which progress is made"
        },
        progress_status: {
          enum: ["completed", "in_progress", "not_started"],
          description: "Status of the progress"
        },
        last_completed_date: {
          bsonType: "date",
          description: "Timestamp of the last completion date"
        }
        // Other progress-related properties can be added here
      }
    }
  }
});

// User Scores collection
db.createCollection("user_scores", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "skill_id", "score", "date"],
      properties: {
        user_id: {
          bsonType: "objectId",
          description: "Reference to the user who achieved the score"
        },
        skill_id: {
          bsonType: "objectId",
          description: "Reference to the skill for which the score is achieved"
        },
        score: {
          bsonType: "int",
          minimum: 0,
          description: "Score achieved by the user"
        },
        date: {
          bsonType: "date",
          description: "Date when the score was achieved"
        }
        // Other score-related properties can be added here
      }
    }
  }
});

EOF

# Execute the MongoDB script
mongo --host $host --port $port $mongo_script_file

# Remove the MongoDB script file
rm $mongo_script_file

# Drop collections (for cleanup purposes)
# mongo --host $host --port $port $database --eval "db.users.drop()"
# mongo --host $host --port $port $database --eval "db.subjects.drop()"
# mongo --host $host --port $port $database --eval "db.skills.drop()"
# mongo --host $host --port $port $database --eval "db.questions.drop()"
# mongo --host $host --port $port $database --eval "db.user_progress.drop()"
# mongo --host $host --port $port $database --eval "db.user_scores.drop()"

echo "MongoDB setup script completed."