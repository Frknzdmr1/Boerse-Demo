import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const LearningPage = () => {
    const [learnings, setLearnings] = useState([]);
    const [score, setScore] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        // Dummy data to simulate fetching from the provided website
        const dummyLearnings = [
            {
                id: 1,
                title: "Einführung ins Trading",
                description: `Trading beinhaltet den Kauf und Verkauf von Finanzinstrumenten wie Aktien, Anleihen, 
                Rohstoffen oder Kryptowährungen mit dem Ziel, einen Gewinn zu erzielen. Wichtige Konzepte umfassen das Verständnis 
                von Marktarten, Handelsstrategien, Risikomanagement und die Rolle der Marktteilnehmer. 
                Anfänger sollten sich zunächst mit grundlegenden Handelsbegriffen und Marktmechanismen vertraut machen.`,
                video_url: "https://www.youtube.com/embed/dmqoqVwFopE",
                quiz: [
                    {
                        question: "Was beinhaltet das Trading?",
                        options: [
                            "Kauf und Verkauf von Finanzinstrumenten",
                            "Erstellung von Marketingstrategien",
                            "Management von IT-Projekten",
                        ],
                        correctAnswer: "Kauf und Verkauf von Finanzinstrumenten"
                    },
                    {
                        question: "Was sind wichtige Konzepte des Tradings?",
                        options: [
                            "Projektmanagement",
                            "Marketingstrategien",
                            "Risikomanagement",
                        ],
                        correctAnswer: "Risikomanagement"
                    },
                    {
                        question: "Welche Finanzinstrumente werden gehandelt?",
                        options: [
                            "Aktien und Anleihen",
                            "Immobilien",
                            "Versicherungspolicen",
                        ],
                        correctAnswer: "Aktien und Anleihen"
                    },
                    {
                        question: "Was sollten Anfänger zuerst lernen?",
                        options: [
                            "Grundlegende Handelsbegriffe",
                            "Erstellung von Geschäftsplänen",
                            "Kundenservice",
                        ],
                        correctAnswer: "Grundlegende Handelsbegriffe"
                    },
                    {
                        question: "Was ist das Ziel des Tradings?",
                        options: [
                            "Gewinn zu erzielen",
                            "Mitarbeiterführung",
                            "Produktentwicklung",
                        ],
                        correctAnswer: "Gewinn zu erzielen"
                    },
                ]
            },
            {
                id: 2,
                title: "Technische Analyse",
                description: `Die technische Analyse ist eine Methode zur Bewertung und Vorhersage zukünftiger Preisbewegungen von 
                Finanzinstrumenten anhand historischer Preisdaten und Handelsvolumen. Sie beinhaltet die Verwendung von Charts 
                und technischen Indikatoren wie gleitenden Durchschnitten, dem Relative Strength Index (RSI) und Bollinger-Bändern. 
                Händler nutzen diese Werkzeuge, um Trends, Unterstützungs- und Widerstandsniveaus zu identifizieren und informierte Handelsentscheidungen zu treffen.`,
                video_url: "https://www.youtube.com/embed/rlZRtQkfK04",
                quiz: [
                    {
                        question: "Was ist technische Analyse?",
                        options: [
                            "Bewertung und Vorhersage von Preisbewegungen",
                            "Erstellung von Geschäftsplänen",
                            "Analyse von Kundenfeedback",
                        ],
                        correctAnswer: "Bewertung und Vorhersage von Preisbewegungen"
                    },
                    {
                        question: "Welche Indikatoren werden in der technischen Analyse verwendet?",
                        options: [
                            "Gleitende Durchschnitte und RSI",
                            "SWOT-Analyse",
                            "PEST-Analyse",
                        ],
                        correctAnswer: "Gleitende Durchschnitte und RSI"
                    },
                    {
                        question: "Wofür nutzen Händler technische Analyse?",
                        options: [
                            "Identifizierung von Trends",
                            "Produktentwicklung",
                            "Kundenakquise",
                        ],
                        correctAnswer: "Identifizierung von Trends"
                    },
                    {
                        question: "Was wird in der technischen Analyse analysiert?",
                        options: [
                            "Historische Preisdaten und Handelsvolumen",
                            "Kundenbewertungen",
                            "Markenbekanntheit",
                        ],
                        correctAnswer: "Historische Preisdaten und Handelsvolumen"
                    },
                    {
                        question: "Was ist das Ziel der technischen Analyse?",
                        options: [
                            "Informierte Handelsentscheidungen zu treffen",
                            "Mitarbeiterführung",
                            "Marketingstrategien zu entwickeln",
                        ],
                        correctAnswer: "Informierte Handelsentscheidungen zu treffen"
                    },
                ]
            },
        ];
        setLearnings(dummyLearnings);
    }, []);

    const handleAnswerSelection = (learningId, questionIndex, answer) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [learningId]: {
                ...prev[learningId],
                [questionIndex]: answer
            }
        }));
        const learning = learnings.find(l => l.id === learningId);
        if (learning.quiz[questionIndex].correctAnswer === answer) {
            setScore(prevScore => prevScore + 1);
        }
    };

    return (
        <Layout title="Lerninhalte">
            <div className="card min-h-[calc(100vh-8.5rem)] px-28 py-20 3xl:px-12 2xl:py-12 xl:p-10 md:min-h-fit md:p-4">
                <div className="mb-20 pl-64 2xl:mb-16 2xl:pl-40 xl:pl-0 md:mb-8">
                    <div className="mb-16 text-h2 text-theme-secondary 2xl:mb-8 2xl:text-h3 md:mb-4 md:text-h5">
                        <span className="block text-theme-primary">Lerninhalte</span>
                        <span className="text-h4">Verbessern Sie Ihr Wissen im Trading</span>
                    </div>
                </div>
                <div>
                    {learnings.map((learning) => (
                        <div
                            className="relative pl-64 pb-32 before:absolute before:top-0 before:left-40 before:bottom-0 before:w-0.25 before:bg-theme-stroke last:pb-0 2xl:pl-40 2xl:before:hidden 2xl:pb-20 xl:pl-0 md:pb-12"
                            key={learning.id}
                        >
                            <div className="mb-0 text-h5 xl:pr-32 md:mb-0 md:pr-0">
                                {learning.title}
                            </div>
                            <div className="relative h-[26.25rem] mb-10 md:h-[22.5rem] md:mb-6">
                                <iframe
                                    className="w-full h-full rounded-3xl"
                                    src={learning.video_url}
                                    title={learning.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="text-base-1s text-theme-secondary md:line-clamp-3">
                                {learning.description}
                            </div>
                            <div className="mt-6">
                                <h4 className="text-lg font-semibold mb-2">Quiz:</h4>
                                {learning.quiz.map((question, questionIndex) => (
                                    <div key={questionIndex} className="mb-4">
                                        <p>{question.question}</p>
                                        <div>
                                            {question.options.map((option, optionIndex) => (
                                                <button
                                                    key={optionIndex}
                                                    className={`mt-2 p-2 border rounded w-full text-left ${
                                                        selectedAnswers[learning.id] &&
                                                        selectedAnswers[learning.id][questionIndex] === option
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                                                    }`}
                                                    onClick={() => handleAnswerSelection(learning.id, questionIndex, option)}
                                                    disabled={selectedAnswers[learning.id] && selectedAnswers[learning.id][questionIndex] !== undefined}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                        {selectedAnswers[learning.id] &&
                                            selectedAnswers[learning.id][questionIndex] !== undefined && (
                                                <div className="mt-2">
                                                    {selectedAnswers[learning.id][questionIndex] === question.correctAnswer
                                                        ? "Richtig!"
                                                        : `Falsch! Die richtige Antwort ist: ${question.correctAnswer}`}
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10">
                    <h3 className="text-xl font-bold">Ihr Punktestand: {score}</h3>
                </div>
            </div>
        </Layout>
    );
};

export default LearningPage;
