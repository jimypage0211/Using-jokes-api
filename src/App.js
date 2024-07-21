import React, { useEffect, useReducer } from "react";
import "./App.css";
import JokesList from "./components/JokesList";

const DUMMY_JOKES = [
    {
        id: "1",
        text: "I was struggling to figure out how lightning works, but then it struck me.",
    },
    {
        id: "2",
        text: "My parents raised me as an only child, which really annoyed my younger brother.",
    },
    {
        id: "3",
        text: "Java is like Alzheimer's, it starts off slow, but eventually, your memory is gone.",
    },
    {
        id: "4",
        text: 'Today, my son asked "Can I have a book mark?" and I burst into tears.\n11 years old and he still doesn\'t know my name is Brian.',
    },
    {
        id: "5",
        text: "The six stages of debugging:\n1. That can't happen.\n2. That doesn't happen on my machine.\n3. That shouldn't happen.\n4. Why does that happen?\n5. Oh, I see.\n6. How did that ever work?",
    },
];

const initialState = {
    jokes: [],
    loading: false,
    change: true,
    error: false,
    errorMessage: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "Fetch Start":
            return { ...state, loading: true };
        case "Fetch Success":
            return { ...state, jokes: action.payload, loading: false };
        case "Fetch Fail":
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.payload.message,
            };
        case "Change":
            return { ...state, change: !state.change };
        default:
            throw new Error("Something Failed :(");
    }
};

const JOKESURL =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist,explicit&type=single&amount=5";

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchJokes = async () => {
            dispatch({ type: "Fetch Start" });
            try {
                const response = await fetch(JOKESURL);
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const jokesJson = await response.json();
                const jokesArray = jokesJson.jokes.map((element) => ({
                    id: element.id,
                    text: element.joke,
                }));
                dispatch({ type: "Fetch Success", payload: jokesArray });
            } catch (error) {
                dispatch({ type: "Fetch Fail", payload: error });
            }
        };
        fetchJokes();
    }, [state.change]);

    const buttonHandler = () => {
        dispatch({ type: "Change" });
    };

    const { jokes, loading, error, errorMessage } = state;
    return (
        <div className="appWrapper">
            <h1>My Jokes</h1>
            {loading && <p style={{ marginTop: "2rem" }}>Loading...</p>}
            {!loading && !error && <JokesList jokes={jokes} />}
            {!loading && !error && (
                <button onClick={buttonHandler}>New Jokes</button>
            )}
            {!loading && error && (
                <p style={{ marginTop: "2rem", color: "red" }}>
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

export default App;
