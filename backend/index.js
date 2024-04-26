const express = require('express');
const cors = require('cors');
const { Reviewer, Paper, User, Data, Reviewers, Author } = require("./db");
const port = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client"));

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email: email });

        if (user && user.password === password) {
            res.send("Login Successful");
        } else {
            res.send("Login failed");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    } 
});

app.get("/submissions", async (req, res) => {

    try {
        const allSubmissions = await Paper.find({}); // Retrieve all submissions

        res.json(allSubmissions);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
 

app.get("/reviewer/:submittedby", async (req, res) => {

    try {

        const { submittedby } = req.params;
        const user = await Author.findOne({ name: submittedby });

        if (!user) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/signup', async (req, res) => {
    const { name, email, password, affiliation, affiliationAddr, contact, link } = req.body;
    console.log('Received registration request:', req.body);

    try {

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            res.json("Email already registered");
        } else {
            const newUser = new User({ 
                name: name, 
                email: email, 
                password: password, 
                affiliation: affiliation, 
                affiliation_addr: affiliationAddr, 
                contact: contact,
                link: link
            });
            await newUser.save();
            res.json("Registration successful");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/reviewers", async function(req, res) {
    try {
        const allReviewers = await Reviewer.find({});
        
        res.json({ status: "ok", data: allReviewers });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

app.get("/reviewers/:id", async function(req, res) {
    try {
        const reviewerId = req.params.id;

        const reviewer = await Reviewer.findById(reviewerId);

        if (reviewer) {
            res.json({ status: "ok", data: reviewer });
        } else {
            res.status(404).json({ status: "error", message: "Reviewer not found" });
        }
    } catch (error) {
        console.error("Error fetching reviewer:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

app.put('/api/papers', async (req, res) => {
    try {
        const papersToUpdate = req.body.papers;

        for (const paper of papersToUpdate) {
            const { _id, rev1, rev2, rev3, assigned } = paper;

            const updatedPaper = await Data.findByIdAndUpdate(_id, { rev1, rev2, rev3, assigned }, { new: true });

            if (!updatedPaper) {
                throw new Error(`Paper with ID ${_id} not found`);
            }
        }

        res.status(200).json({ message: 'Papers updated successfully', papers: papersToUpdate });

    } catch (error) {
        console.error('Failed to save the papers:', error);
        res.status(500).send('Error saving the papers');
    }
});

app.get('/api/data', async (req, res) => {
    try {
      const papers = await Data.find();
      if (!papers.length) {
        console.log("No papers found in the database.");  // Confirm if the database query returned empty
      } else {
        console.log("Papers fetched:", papers);
      }
  
      const reviewers = await Reviewers.find().select('name -_id');
      console.log("Reviewers fetched:", reviewers);
  
      const data = {
        paper: papers.map(p => ({
        id: p._id,
        name: p.title,
        author: p.submittedby,
        rev1: p.rev1 || "",
        rev2: p.rev2 || "",
        rev3: p.rev3 || "",
        assigned: p.assigned
        })),
        reviewers: reviewers.map(r => r.name)
      };
  
      res.json(data);
    } catch (err) {
      console.error('Error fetching data from MongoDB:', err);
      res.status(500).send('Error fetching data from MongoDB');
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


