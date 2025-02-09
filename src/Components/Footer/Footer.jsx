import React from "react";

const Footer = () => {
  return (
    <div className="flex items-end w-full mt-5 bg-white">
      <footer className="w-full text-gray-700 bg-gray-100 body-font">
        <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row">
          <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
            <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
              <svg
                className="w-auto h-5 text-gray-900 fill-current"
                viewBox="0 0 202 69"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M57.44.672s6.656 1.872 6.656 5.72c0 0-1.56 2.6-3.744 6.552 8.424 1.248 16.744 1.248 23.816-1.976-1.352 7.904-12.688 8.008-26.208 6.136C50.272 26.408 38.312 48.976 38.312 55.632c0 .416.208.624.52.624 4.576 0 17.888-14.352 21.112-18.824 1.144-1.456 4.264.728 3.12 2.392C56.608 53.088 42.152 69 36.432 69c-4.472 0-8.216-5.928-8.216-10.4 0-6.552 11.752-28.08 20.28-42.952-9.984-1.664-20.176-3.64-27.976-3.848C6.584 11.8 3.88 15.336 2.944 17.832c-.104.312-.52.52-.832.312-3.744-7.072-1.456-14.56 14.144-14.56 9.36 0 22.048 4.576 34.944 7.592C54.736 5.04 57.44.672 57.44.672z" />
              </svg>
            </a>
            <p className="mt-2 text-sm text-gray-500">Design, Code and Ship!</p>
            <div className="mt-4">
              <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                {[
                  "facebook",
                  "twitter",
                  "instagram",
                  "linkedin",
                ].map((social, index) => (
                  <a key={index} className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                ))}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
            {[
              { title: "About", links: ["Company", "Careers", "Blog"] },
              { title: "Support", links: ["Contact Support", "Help Resources", "Release Updates"] },
              { title: "Platform", links: ["Terms & Privacy", "Pricing", "FAQ"] },
              { title: "Contact", links: ["Send a Message", "Request a Quote", "+123-456-7890"] },
            ].map((section, index) => (
              <div key={index} className="w-full px-4 lg:w-1/4 md:w-1/2">
                <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
                  {section.title}
                </h2>
                <nav className="mb-10 list-none">
                  {section.links.map((link, idx) => (
                    <li key={idx} className="mt-3">
                      <a className="text-gray-500 cursor-pointer hover:text-gray-900">{link}</a>
                    </li>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-300">
          <div className="container px-5 py-4 mx-auto">
            <p className="text-sm text-gray-700 capitalize xl:text-center">© 2025 All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
