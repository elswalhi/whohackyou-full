import React, { useState } from "react";
import axios from "axios";

const HaveIBeenPwnedCheck = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const apiKey = "87d94312d51b4410b58a55b134708950"; // Replace 'YOUR_API_KEY' with your actual API key

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setResult([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false`,
        {
          headers: {
            "hibp-api-key": apiKey,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
          
        }
        ,{ crossdomain: true }
        
      );
      setResult(response.data);
      console.log(result);
    } catch (error) {
      setResult(null);
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  return (
    // <div className=''>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" placeholder="Enter your email" value={email} onChange={handleInputChange} />
    //     <button type="submit" disabled={!email || loading}>
    //       {loading ? 'Checking...' : 'Check'}
    //     </button>
    //   </form>
    //   {result && (
    //     <div>
    //       <h2>Breached Sites:</h2>
    //       <ul>
    //         {result.map((breach) => (
    //           <li key={breach.Name}>{breach.Name}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>

    <>
      <section className="min-h-screen bg-gray-900 w-full">
        <div className="pt-5 text-center flex items-center justify-center flex-col gap-4">
          <h1 className="text-white text-5xl font-serif  ">Data breach</h1>
          <span className="text-white mt-4">
            Breached accounts can expose your personal information. Secure
            breached accounts by enabling 2FA or creating a stronger password.
          </span>
          <form className="w-full max-w-lg mt-10" onSubmit={handleSubmit}>
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Username or email"
                aria-label="Full name"
                value={email}
                onChange={handleInputChange}
              />
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                {loading ? "Checking..." : "Check breaches"}
              </button>
            </div>
          </form>
        </div>
        {result === null && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg max-w-lg mx-5 my-10">
            <p className="text-lg font-semibold">GOOD NEWS</p>
            <p>{email} was not found in any known data breaches</p>
          </div>
        )}
        {result && result.length !== 0 && (
          <div>
            <h2 className="text-red-700 text-center mt-5 font-bold text-lg">
              {" "}
              BREACHED ACCOUNTS FOUND !
            </h2>
            <div className="-mx-4 flex flex-wrap p-8">
              {result.slice(0, 5).map((breach) => (
                <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                  <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9  bg-white">
                    <div className="mx-auto mb-7 inline-block">
                      <img src={breach.LogoPath} className="h-[50px]" alt="" />
                    </div>
                    <div>
                      <a
                        className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl"
                        href={breach.Domain}
                      >
                        {breach.Name}
                      </a>

                      <p
                        className="text-base font-medium text-body-color overflow-hidden"
                        style={{
                          maxHeight: "3em", // Adjust the max height as needed
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2, // Adjust the number of lines to display
                          WebkitBoxOrient: "vertical",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: breach.Description,
                        }}
                      ></p>

                      <ul className="mt-2">
                        <span>Compromised data:</span>
                        {breach.DataClasses.map((item) => {
                          return <li>- {item}</li>;
                        })}
                      </ul>
                    </div>
                    {/* <div className="flex gap-4 flex-wrap">
                        <ul className="flex items-center gap-2">
                          <li>Website</li>
                          <li>Website</li>
                        </ul>
                        <ul className="flex items-center gap-2">
                          <li>Website</li>
                          <li>Website</li>
                        </ul>
                        <ul className="flex items-center gap-2">
                          <li>Website</li>
                          <li>Website</li>
                        </ul>
                      </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
  // {
  //     "Name": "000webhost",
  //     "Title": "000webhost",
  //     "Domain": "000webhost.com",
  //     "BreachDate": "2015-03-01",
  //     "AddedDate": "2015-10-26T23:35:45Z",
  //     "ModifiedDate": "2017-12-10T21:44:27Z",
  //     "PwnCount": 14936670,
  //     "Description": "In approximately March 2015, the free web hosting provider <a href=\"http://www.troyhunt.com/2015/10/breaches-traders-plain-text-passwords.html\" target=\"_blank\" rel=\"noopener\">000webhost suffered a major data breach</a> that exposed almost 15 million customer records. The data was sold and traded before 000webhost was alerted in October. The breach included names, email addresses and plain text passwords.",
  //     "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/000webhost.png",
  //     "DataClasses": [
  //         "Email addresses",
  //         "IP addresses",
  //         "Names",
  //         "Passwords"
  //     ],
  //     "IsVerified": true,
  //     "IsFabricated": false,
  //     "IsSensitive": false,
  //     "IsRetired": false,
  //     "IsSpamList": false,
  //     "IsMalware": false,
  //     "IsSubscriptionFree": false
  // }
};

export default HaveIBeenPwnedCheck;
