import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password validation
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let strength = "";
  let progress = "0%";
  let barColor = "bg-gray-200";
  let strengthColor = "text-gray-400";
  let message = "Enter a password to check its strength.";

  if (password.length > 0) {
    if (score <= 2) {
      strength = "Weak";
      progress = "33%";
      barColor = "bg-red-500";
      strengthColor = "text-red-500";
      message =
        "Weak password. Try adding uppercase, numbers and special characters.";
    } else if (score <= 4) {
      strength = "Medium";
      progress = "66%";
      barColor = "bg-yellow-400";
      strengthColor = "text-yellow-500";
      message =
        "Medium password. Add the missing requirements to make it stronger.";
    } else {
      strength = "Strong";
      progress = "100%";
      barColor = "bg-green-500";
      strengthColor = "text-green-500";
      message = "Excellent! Your password is strong.";
    }
  }

  const requirements = [
    ["At least 8 characters", checks.length],
    ["Uppercase letter", checks.uppercase],
    ["Lowercase letter", checks.lowercase],
    ["Number", checks.number],
    ["Special character", checks.special],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center px-4 py-10">

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl px-8 py-10 md:px-12 md:py-12">

        {/* Lock Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-24 h-24 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-5xl">
              🔒
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-4xl md:text-5xl font-bold text-slate-900">
          Password Strength Checker
        </h1>

        {/* Subtitle */}
        <p className="text-center text-xl md:text-2xl text-slate-500 mt-4 mb-10">
          Create a strong and secure password
        </p>

        {/* Password Label */}
        <label className="block text-xl font-bold text-slate-700 mb-3">
          Enter Password
        </label>

        {/* Password Input */}
        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="
              w-full
              h-20
              px-6
              pr-16
              text-xl
              text-slate-800
              border-2
              border-slate-200
              rounded-2xl
              outline-none
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
              transition
            "
          />

          {/* Eye Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              text-2xl
              text-slate-500
              hover:text-indigo-500
              transition
            "
          >
            {showPassword ? "🙈" : "👁"}
          </button>

        </div>

        {/* Strength Header */}
        <div className="flex items-center justify-between mt-10 mb-4">

          <span className="text-xl font-bold text-slate-600">
            Password Strength
          </span>

          <span className={`text-xl font-bold ${strengthColor}`}>
            {strength}
          </span>

        </div>

        {/* Progress Bar */}
        <div className="w-full h-5 bg-slate-200 rounded-full overflow-hidden">

          <div
            className={`
              h-full
              rounded-full
              ${barColor}
              transition-all
              duration-700
              ease-out
            `}
            style={{
              width: progress,
            }}
          ></div>

        </div>

        {/* Message */}
        <div
          className={`
            mt-7
            p-5
            rounded-2xl
            border
            ${
              score === 5
                ? "bg-green-50 border-green-100 text-green-600"
                : score >= 3
                ? "bg-yellow-50 border-yellow-100 text-yellow-600"
                : password
                ? "bg-red-50 border-red-100 text-red-600"
                : "bg-slate-50 border-slate-100 text-slate-500"
            }
          `}
        >

          <div className="flex items-center gap-4">

            {score === 5 && (
              <span className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold">
                ✓
              </span>
            )}

            <p className="text-lg font-semibold">
              {message}
            </p>

          </div>

        </div>

        {/* Requirements */}
        <div className="mt-8 space-y-5">

          {requirements.map(([text, valid], index) => (

            <div
              key={index}
              className={`
                flex
                items-center
                gap-4
                text-xl
                font-semibold
                transition-all
                duration-300
                ${
                  valid
                    ? "text-green-500"
                    : "text-slate-400"
                }
              `}
            >

              <span
                className={`
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-lg
                  font-bold
                  ${
                    valid
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 text-slate-400"
                  }
                `}
              >
                {valid ? "✓" : "×"}
              </span>

              <span>
                {text}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default App;