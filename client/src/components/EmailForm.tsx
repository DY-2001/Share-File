import axios from "axios";
import { FunctionComponent, useState } from "react";

const EmailForm: FunctionComponent<{ id: string }> = ({ id }) => {
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [message, setMessage] = useState("");

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/files/email",
        data: {
          id,
          emailFrom,
          emailTo,
        },
      });

      setMessage(data.message);
    } catch (error: any) {
      console.error(error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 space-y-3 rounded-md border-2 border-white my-4">
      {!message ? (
        <>
          <h3>You can also send the file through mail</h3>
          <form
            onSubmit={handleEmail}
            className="flex flex-col items-center justify-center w-1/2 p-2 space-y-3"
          >
            <input
              className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
              type="email"
              placeholder="Email From"
              required
              onChange={(e) => setEmailFrom(e.target.value)}
              value={emailFrom}
            />
            <input
              className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
              type="email"
              placeholder="Email To"
              required
              onChange={(e) => setEmailTo(e.target.value)}
              value={emailTo}
            />
            <button className="button" type="submit">
              Send
            </button>
          </form>
        </>
      ) : (
        <h3>{message}</h3>
      )}
    </div>
  );
};

export default EmailForm;
