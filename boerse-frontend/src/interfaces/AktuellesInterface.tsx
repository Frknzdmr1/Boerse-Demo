interface Insight {
    ticker: string;
    sentiment: string;
    sentiment_reasoning: string;
}
interface Publisher {
    name: string;
    homepage_url: string;
    logo_url: string;
}
interface AktuellesBeitrag {
    id: string;
    title: string;
    author: string;
    published_utc: string;
    logo_url: string;
    article_url: string;
    image_url: string;
    description: string;
    insights: Insight[];
    publisher: Publisher;
}