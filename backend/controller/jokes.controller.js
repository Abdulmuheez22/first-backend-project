import jokes from "../models/jokes.js";
import jokeSchema from "../util/formValidation.js";

export const findJoke = (req, res) => {
  try {
    if (!req.params) return res.status(402).json({message: "Don't be stupid bro!"})

    const { id } = req.params;
    const cleanedId = parseInt(id);
    const validateId = jokeSchema.safeParse({id: cleanedId})
    if (!validateId.success) {
      // Iterate over each issue to get the specific message and field path
      validateId.error.issues.forEach((issue) => {
        console.log(`${issue.path.join('.')}: ${issue.message}`);
      })
    };

    if (cleanedId < 1 || cleanedId > jokes.length) {
      return res
        .status(400)
        .json({
          message:
            "Invalid ID: ID must be greater than 0 and less than or equal to 50",
        });
    }

    const foundJoke = jokes.find((joke) => joke.id === cleanedId);
    return res.status(200).json({ foundJoke, ok: true, status: 200 });
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

export const addJoke = (req, res) => {
  try {
    const { joke } = req.body;
    let jokeObj = {
      id: jokes.length + 1,
      joke,
    };
    jokes.push(jokeObj);
    return res
      .status(200)
      .json({ message: "Joke added successfully", jokeObj });
  } catch (err) {
    return res.status(400).json({ message: `Error : ${err}` });
  }
};


export const deleteJoke = (req, res) => {
  try {
    const { id } = req.params;
    const cleanedId = parseInt(id);

    const index = jokes.findIndex((joke) => joke.id === cleanedId);
    jokes.splice(index, 1);
    res.json({
      jokes,
      status: 200,
      ok: true,
    });
  } catch (err) {
    res.status(400).json({ title: "bad request" });
  }
};

export const updateJoke = (req, res) => {
  try {
    const { id } = req.params;
    const { joke } = req.body;
    const cleanedId = parseInt(id);

    const index = jokes.findIndex((j) => j.id === cleanedId);
    if (index === -1) {
      return res.status(404).json({ message: "Joke not found" });
    }

    jokes[index].joke = joke;
    return res
      .status(200)
      .json({ message: "Joke updated successfully", joke: jokes[index] });
  } catch (err) {
    return res.status(400).json({ message: `Error: ${err}` });
  }
};