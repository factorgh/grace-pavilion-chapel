import { useState } from "react";
import { motion } from "framer-motion";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock, Plus, Save, Trash, X } from "lucide-react";
import { format, addDays } from "date-fns";

type Availability = {
  date: string;
  slots: string[];
};

type AvailabilityManagerProps = {
  initialAvailability: Availability[];
  onSave: (availability: Availability[]) => void;
};

const AvailabilityManager = ({
  initialAvailability,
  onSave,
}: AvailabilityManagerProps) => {
  const [availability, setAvailability] =
    useState<Availability[]>(initialAvailability);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newTimeSlot, setNewTimeSlot] = useState("09:00 AM");
  const [isEditing, setIsEditing] = useState(false);

  // Available time options
  const timeOptions = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
  ];

  // Handle adding a new time slot to a date
  const addTimeSlot = () => {
    if (!selectedDate || !newTimeSlot) return;

    const dateString = selectedDate.toISOString().split("T")[0];
    const existingDay = availability.find((day) => day.date === dateString);

    if (existingDay) {
      // Don't add duplicate slots
      if (!existingDay.slots.includes(newTimeSlot)) {
        const updatedAvailability = availability.map((day) =>
          day.date === dateString
            ? { ...day, slots: [...day.slots, newTimeSlot].sort() }
            : day
        );
        setAvailability(updatedAvailability);
      }
    } else {
      // Add new day with slot
      const updatedAvailability = [
        ...availability,
        { date: dateString, slots: [newTimeSlot] },
      ].sort((a, b) => a.date.localeCompare(b.date));

      setAvailability(updatedAvailability);
    }
  };

  // Remove a time slot from a date
  const removeTimeSlot = (date: string, slot: string) => {
    const updatedAvailability = availability
      .map((day) => {
        if (day.date === date) {
          const newSlots = day.slots.filter((s) => s !== slot);
          return { ...day, slots: newSlots };
        }
        return day;
      })
      .filter((day) => day.slots.length > 0); // Remove days with no slots

    setAvailability(updatedAvailability);
  };

  // Add availability for the next 2 weeks (common pattern)
  const addTwoWeeks = () => {
    const newAvailability = [...availability];
    const today = new Date();

    // Add slots for the next 14 days
    for (let i = 1; i <= 14; i++) {
      // Skip weekends (0 = Sunday, 6 = Saturday)
      const nextDay = addDays(today, i);
      const dayOfWeek = nextDay.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const dateString = nextDay.toISOString().split("T")[0];
        const existingDay = newAvailability.find(
          (day) => day.date === dateString
        );

        if (!existingDay) {
          // Add standard morning and afternoon slots
          newAvailability.push({
            date: dateString,
            slots: [
              "09:00 AM",
              "10:00 AM",
              "11:00 AM",
              "01:00 PM",
              "02:00 PM",
              "03:00 PM",
            ],
          });
        }
      }
    }

    setAvailability(
      newAvailability.sort((a, b) => a.date.localeCompare(b.date))
    );
  };

  // Handle saving all changes
  const handleSave = () => {
    onSave(availability);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-50 dark:bg-blue-900 border-b border-blue-100 dark:border-blue-800 flex justify-between items-center">
        <h2 className="text-lg font-bold text-blue-900 dark:text-blue-100">
          Manage Pastor Availability
        </h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
              >
                <Save size={16} className="mr-1" />
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
              >
                <X size={16} className="mr-1" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
            >
              <Clock size={16} className="mr-1" />
              Edit Availability
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="p-4">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300">
                Select Date
              </label>
              <ReactDatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                minDate={new Date()}
                inline
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <div className="mb-6">
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  New Time Slot
                </label>
                <div className="flex space-x-2">
                  <select
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addTimeSlot}
                    disabled={!selectedDate}
                    className={`flex items-center px-3 py-2 rounded ${
                      selectedDate
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Plus size={16} className="mr-1" />
                    Add
                  </button>
                </div>

                {!selectedDate && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    Please select a date first
                  </p>
                )}
              </div>

              <div>
                <button
                  onClick={addTwoWeeks}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center text-sm"
                >
                  <Calendar size={16} className="mr-1" />
                  Add Standard Two Week Schedule
                </button>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Adds 9AM-11AM and 1PM-3PM slots for weekdays in the next two
                  weeks
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-bold mb-2 text-gray-800 dark:text-gray-200">
              Current Availability:
            </h3>
            {availability.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No availability set yet
              </p>
            ) : (
              <div className="space-y-4">
                {availability.map((day) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-md"
                  >
                    <div className="font-bold flex items-center text-blue-800 dark:text-blue-300 mb-2">
                      <Calendar size={16} className="mr-2" />
                      {format(new Date(day.date), "EEEE, MMMM d, yyyy")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day.slots.map((slot) => (
                        <div
                          key={`${day.date}-${slot}`}
                          className="flex items-center bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
                        >
                          <Clock size={14} className="mr-1" />
                          {slot}
                          <button
                            onClick={() => removeTimeSlot(day.date, slot)}
                            className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="text-gray-700 dark:text-gray-300 mb-4">
            Available time slots for appointments:
          </div>

          {availability.slice(0, 5).map((day, index) => (
            <div
              key={index}
              className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div className="flex items-center font-bold mb-2 text-gray-800 dark:text-gray-200">
                <Calendar
                  size={16}
                  className="text-blue-600 dark:text-blue-400 mr-2"
                />
                {format(new Date(day.date), "EEEE, MMMM d, yyyy")}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {day.slots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="flex items-center text-gray-600 dark:text-gray-400"
                  >
                    <Clock
                      size={14}
                      className="text-blue-600 dark:text-blue-400 mr-2"
                    />
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {availability.length > 5 && (
            <div className="text-center mt-4">
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                View All ({availability.length}) Days
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilityManager;
