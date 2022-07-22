import { useState } from 'react';

import axios from "axios";

const API_URL = "http://localhost:5005"

function CardForm (props) {
    console.log(props)


    const [cardForm, setCardForm] = useState(false);

    const [cardTitle, setCardTitle] = useState("")
    const [cardDescription, setCardDescription] = useState("");
    const [cardStat, setCardStat] = useState("TODO");
    const [cardColor, setCardColor] = useState("Red")


    const handleSubmitNewCard = (e) => {

        e.preventDefault();

        const body = {
          title: cardTitle,
          description: cardDescription,
          stat: cardStat,
          color: cardColor
        };

        axios
            .post(`${API_URL}/colaborator-API/projects/${props.projectId}/card/new-card`, body)
            .then((response) => {
                props.setCards([...props.cards, response.data])

                setCardTitle("");
                setCardDescription("");
                setCardForm(false)
                setCardColor("white")
                setCardStat("TODO");
                
                props.getAllCards()
                props.setCardForm(false)

            })
            .catch((error) => console.log(error));
    };

    

    return (
        <div class="p-6 bg-white rounded-md">
            <h2 className='text-2xl'>New Card</h2>
            <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmitNewCard}>
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div>
                        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                            Title
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm ">
                                <input
                                type="text"
                                name="title"
                                id="title"
                                onChange={(e) => setCardTitle(e.target.value)}
                                value={cardTitle}
                                className="flex-1 block w-full focus:ring focus:outline-none focus:ring-lime-600 focus:border min-w-0 rounded-r-md sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                            Description
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                onChange={(e) => setCardDescription(e.target.value)}
                                value={cardDescription}
                                className="max-w-lg shadow-sm block w-full focus:ring focus:outline-none focus:ring-lime-600 focus:border sm:text-sm border border-gray-300 rounded-md"
                            />
                            </div>
                        </div>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Color
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                >
                                <option>white</option>
                                <option>yellow</option>
                                <option>green</option>
                                <option>red</option>
                                <option>orange</option>
                                <option>blue</option>
                                <option>gray</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="pt-5">
                    <div className="flex justify-center">
                        <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => props.setCardForm(false)}
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        //onClick={() => props.setCardForm(false)}
                        >
                        Add Project
                        </button>
                    </div>
                </div>   
            </form>
        </div>
    )
}

export default CardForm;
