import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import FeedbackForm from "@components/FeedbackForm";
import JokeBlock from "@components/JokeBlock";
import { useState } from "react";
import TimePicker from "@components/TimePicker";
import DatePicker from "@components/DatePicker";
import LocationPicker from "@components/LocationPicker";

export default function Home() {
  const [birthDate, setBirthDate] = useState(null);
  const [birthTime, setBirthTime] = useState(null);
  const [birthLocation, setBirthLocation] = useState(null);

  const handleFormSubmit = (formData) => {
    console.log("Form data:", formData);
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js Toolbox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Next.js Toolbox" />
        <hr />
        <FeedbackForm
          birthDate={birthDate}
          birthTime={birthTime}
          birthLocation={birthLocation}
          onFormSubmit={handleFormSubmit}
        />
      </main>
      <Footer />
    </div>
  );
}
