import React, { useState } from "react";
import { Check, X, Loader2, Code, AlertTriangle } from "lucide-react";

const SubmissionState = {
    IDLE: "idle",
    SUBMITTING: "submitting",
    SUCCESS: "success",
    ERROR: "error",
    RESULTS: "results",
};

// Mock test cases results remain the same
const testResults = [
    // ... your existing test cases
];

const CodeSubmission = () => {
    const [state, setState] = useState(SubmissionState.IDLE);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setState(SubmissionState.SUBMITTING);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (Math.random() > 0.2) {
                setResults(testResults);
                setState(SubmissionState.RESULTS);
                // Show results in alert
                const passRate = getPassRate();
                let message = passRate === 100 
                    ? "All Test Cases Passed! 🎉\n\n"
                    : "Some Tests Failed!\n\n";
                
                message += testResults.map(test => 
                    `${test.name}: ${test.status.toUpperCase()} (${test.time} | ${test.memory})${test.error ? '\nError: ' + test.error : ''}`
                ).join('\n\n');
                
                alert(message);
            } else {
                throw new Error("Compilation error: Syntax error at line 42");
            }
        } catch (err) {
            setError(err.message);
            setState(SubmissionState.ERROR);
            alert(`Error: ${err.message}`);
        }
    };

    const handleReset = () => {
        setState(SubmissionState.IDLE);
        setResults(null);
        setError(null);
    };

    const getPassRate = () => {
        if (!results) return 0;
        const passed = results.filter((r) => r.status === "passed").length;
        return Math.round((passed / results.length) * 100);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <button
                onClick={handleSubmit}
                disabled={state === SubmissionState.SUBMITTING}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white 
                    ${
                        state === SubmissionState.SUBMITTING
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    } transition-colors duration-200 flex items-center justify-center gap-2`}
            >
                {state === SubmissionState.SUBMITTING ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Code className="w-5 h-5" />
                        Submit Solution
                    </>
                )}
            </button>
        </div>
    );
};

export default CodeSubmission;
