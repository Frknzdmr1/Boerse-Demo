"use client";

import {useEffect, useState} from "react";
import Layout from "@/components/Layout";

import Image from "@/components/Image";
import axios from "axios";
import {Link} from "react-router-dom";


const AktuellesPage = () => {
    const [aktuelles, setAktuelles] = useState<AktuellesBeitrag[]>([]);

    useEffect(() => {
        const fetchAktuelles = async () => {
            try {
                const response = await axios.get(
                    "https://api.polygon.io/v2/reference/news?limit=10&apiKey=pjkCblk2m3STHrDTphbWyMUmKiCcfZeu"
                );
                setAktuelles(response.data.results);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchAktuelles();
    }, []);

    return (
        <Layout title="Aktuelles">
            <div
                className="card min-h-[calc(100vh-8.5rem)] px-28 py-20 3xl:px-12 2xl:py-12 xl:p-10 md:min-h-fit md:p-4">
                <div className="mb-20 pl-64 2xl:mb-16 2xl:pl-40 xl:pl-0 md:mb-8">
                    <div className="mb-16 text-h2 text-theme-secondary 2xl:mb-8 2xl:text-h3 md:mb-4 md:text-h5">
                        <span className="block text-theme-primary">Aktuelles</span>
                        <span className="text-h4">Fundierte Entscheidungen treffen</span>

                    </div>

                </div>
                <div className="">
                    {aktuelles.map((beitrag) => (
                        <div
                            className="relative pl-64 pb-32 before:absolute before:top-0 before:left-40 before:bottom-0 before:w-0.25 before:bg-theme-stroke last:pb-0 2xl:pl-40 2xl:before:hidden 2xl:pb-20 xl:pl-0 md:pb-12"
                            key={beitrag.id}
                        >

                            <div className="mb-0 text-h5 xl:pr-32 md:mb-0 md:pr-0">
                                {beitrag.title}
                            </div>
                            <div className="mb-10 text-sm xl:pr-32 md:mb-0 md:pr-0">
                                <span>Article source: </span>
                                <a
                                    href={beitrag.article_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-theme-secondary hover:underline"
                                >
                                    {beitrag.publisher.name}
                                </a>
                            </div>

                            <div
                                className="absolute top-0 left-0 xl:left-auto xl:right-0 xl:text-right md:static md:flex md:items-center md:mt-2 md:mb-6">

                                <div className="text-base-1s md:text-caption-2m md:text-theme-secondary">
                                    {new Date(beitrag.published_utc).toLocaleDateString()}
                                </div>
                                <div className="text-caption-2m text-theme-secondary text-center md:ml-2">
                                    {new Date(beitrag.published_utc).toLocaleTimeString()}
                                </div>
                                <div
                                    className="w-20 h-20 object-fill rounded-full opacity-100 border-2 border-b-brand-950">
                                    <Link to={beitrag.publisher.homepage_url} target="_blank">
                                        <Image
                                            className="w-20 h-20 object-fill rounded-full opacity-100"
                                            src={beitrag.publisher.logo_url}
                                            width={32}
                                            height={32}
                                            alt={beitrag.publisher.name}
                                        /></Link></div>
                            </div>
                            <div className="relative h-[26.25rem] mb-10 md:h-[22.5rem] md:mb-6">
                                <Image
                                    className="object-cover rounded-3xl"
                                    src={beitrag.image_url}
                                    fill
                                    sizes="(max-width: 767px) 100vw, 50vw"
                                    alt=""
                                />
                            </div>
                            <div className="text-base-1s text-theme-secondary md:line-clamp-3">
                                {beitrag.description}
                            </div>
                            {beitrag.insights && beitrag.insights.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold mb-2">Insights:</h4>
                                    {beitrag.insights.map((insight, index) => (
                                        <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                                            <p className="font-medium">Ticker: {insight.ticker}</p>
                                            <p className="capitalize">Sentiment: <span
                                                className={`font-semibold ${insight.sentiment === 'positive' ? 'text-green-600' : 'text-red-600'}`}>{insight.sentiment}</span>
                                            </p>
                                            <p className="mt-2">{insight.sentiment_reasoning}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default AktuellesPage;