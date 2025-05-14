import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Upload } from "lucide-react";

type Room = {
  id: string;
  name: string;
  capacity: number;
  type: string;
};

const UserManagement = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("Lecture Hall");
  const [capacity, setCapacity] = useState(0);
  const [timetableFile, setTimetableFile] = useState<File | null>(null);

  const handleAddRoom = () => {
    if (roomName && capacity > 0) {
      const newRoom: Room = {
        id: Date.now().toString(),
        name: roomName,
        capacity,
        type: roomType,
      };
      setRooms([...rooms, newRoom]);
      setRoomName("");
      setCapacity(0);
      setRoomType("Lecture Hall");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTimetableFile(file);
      alert(`File "${file.name}" uploaded successfully!`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1">
        <Navbar />

        <main className="p-6 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-campus-primary">Room & Timetable Management</h1>
            <p className="text-gray-600">Add rooms and upload timetable files.</p>
          </div>

          {/* Add Room Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Add a New Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Capacity"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
                className="border p-2 rounded"
              />
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="border p-2 rounded"
              >
                <option>Lecture Hall</option>
                <option>Lab</option>
                <option>Auditorium</option>
                <option>Seminar Room</option>
              </select>
            </div>
            <button
              onClick={handleAddRoom}
              className="mt-4 bg-campus-primary text-white px-4 py-2 rounded"
            >
              Add Room
            </button>
          </div>

          {/* Upload Timetable */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Upload Timetable</h2>
            <label className="flex items-center gap-3 border border-dashed border-gray-400 p-4 rounded cursor-pointer hover:border-campus-primary">
              <Upload />
              <input
                type="file"
                accept=".pdf,.csv"
                className="hidden"
                onChange={handleFileUpload}
              />
              <span className="text-sm text-gray-600">
                {timetableFile ? timetableFile.name : "Choose a .pdf or .csv file"}
              </span>
            </label>
          </div>

          {/* Room List Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Rooms List</h2>
            {rooms.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border">Room Name</th>
                    <th className="p-2 border">Type</th>
                    <th className="p-2 border">Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td className="p-2 border">{room.name}</td>
                      <td className="p-2 border">{room.type}</td>
                      <td className="p-2 border">{room.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No rooms added yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
