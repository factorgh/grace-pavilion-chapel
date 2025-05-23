import { useState } from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  Check,
  CreditCard,
  DollarSign,
  Gift,
  Heart,
} from "lucide-react";
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  zipCode: string;
};

const Payments = () => {
  const [paymentType, setPaymentType] = useState("tithe");
  const [amount, setAmount] = useState<number>(50);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const paymentOptions = [
    { id: "tithe", label: "Tithe", icon: <Banknote size={28} /> },
    { id: "offering", label: "Offering", icon: <Gift size={28} /> },
    { id: "donation", label: "Donation", icon: <Heart size={28} /> },
    { id: "building", label: "Building Fund", icon: <DollarSign size={28} /> },
  ];

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const onSubmit = (data: FormData) => {
    console.log({
      ...data,
      paymentType,
      amount,
    });

    setIsSubmitted(true);
    reset();

    // Reset submission status after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setAmount(50);
      setPaymentType("tithe");
    }, 5000);
  };

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1
  //     }
  //   }
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1
            className="text-4xl font-bold text-blue-900 mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Give Online
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Support our ministry and mission through your generous giving
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {isSubmitted ? (
              <div className="p-12 text-center">
                <Check size={64} className="text-green-500 mx-auto mb-6" />
                <h2
                  className="text-2xl font-bold text-green-600 mb-4"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Thank You for Your Generous Gift!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your contribution of ${amount} has been received. A receipt
                  has been emailed to you for your records.
                </p>
                <p className="text-gray-600">
                  "Each of you should give what you have decided in your heart
                  to give, not reluctantly or under compulsion, for God loves a
                  cheerful giver." - 2 Corinthians 9:7
                </p>
              </div>
            ) : (
              <div className="md:flex">
                <div className="md:w-1/2 p-8 bg-blue-700 text-white">
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Giving Information
                  </h2>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4">
                      Select Giving Type
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {paymentOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className={`flex items-center justify-center p-4 rounded transition ${
                            paymentType === option.id
                              ? "bg-white text-blue-700 font-bold"
                              : "bg-blue-800 hover:bg-blue-600"
                          }`}
                          onClick={() => setPaymentType(option.id)}
                        >
                          <span className="mr-2">{option.icon}</span>
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4">Select Amount</h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {predefinedAmounts.map((presetAmount) => (
                        <button
                          key={presetAmount}
                          type="button"
                          className={`p-3 rounded transition text-center ${
                            amount === presetAmount
                              ? "bg-white text-blue-700 font-bold"
                              : "bg-blue-800 hover:bg-blue-600"
                          }`}
                          onClick={() => setAmount(presetAmount)}
                        >
                          ${presetAmount}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block mb-2">Custom Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700 font-bold">
                          $
                        </span>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) =>
                            setAmount(parseInt(e.target.value) || 0)
                          }
                          className="w-full p-3 pl-8 rounded text-blue-800 font-bold"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-800 p-4 rounded">
                    <p className="text-sm opacity-90">
                      "Bring the whole tithe into the storehouse, that there may
                      be food in my house. Test me in this," says the LORD
                      Almighty, "and see if I will not throw open the floodgates
                      of heaven and pour out so much blessing that there will
                      not be room enough to store it." - Malachi 3:10
                    </p>
                  </div>
                </div>

                <div className="md:w-1/2 p-8">
                  <h2
                    className="text-2xl font-bold text-blue-900 mb-6"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    Payment Information
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block mb-2 text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-red-500 text-sm">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-red-500 text-sm">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2 text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2 text-gray-700 flex items-center">
                        <CreditCard size={18} className="mr-2 text-blue-600" />
                        <span>Card Number</span>
                      </label>
                      <input
                        type="text"
                        {...register("cardNumber", {
                          required: "Card number is required",
                          pattern: {
                            value: /^[0-9]{16}$/,
                            message:
                              "Please enter a valid 16-digit card number",
                          },
                        })}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="col-span-1">
                        <label className="block mb-2 text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          {...register("expiryDate", {
                            required: "Required",
                            pattern: {
                              value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                              message: "Format: MM/YY",
                            },
                          })}
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && (
                          <p className="mt-1 text-red-500 text-sm">
                            {errors.expiryDate.message}
                          </p>
                        )}
                      </div>
                      <div className="col-span-1">
                        <label className="block mb-2 text-gray-700">CVV</label>
                        <input
                          type="text"
                          {...register("cvv", {
                            required: "Required",
                            pattern: {
                              value: /^[0-9]{3,4}$/,
                              message: "3-4 digits",
                            },
                          })}
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123"
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-red-500 text-sm">
                            {errors.cvv.message}
                          </p>
                        )}
                      </div>
                      <div className="col-span-1">
                        <label className="block mb-2 text-gray-700">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          {...register("zipCode", { required: "Required" })}
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="12345"
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-red-500 text-sm">
                            {errors.zipCode.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-md transition duration-300"
                    >
                      Complete ${amount}{" "}
                      {paymentType.charAt(0).toUpperCase() +
                        paymentType.slice(1)}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Payments;
