
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const bookingsByDay = [
  { name: 'Monday', bookings: 12 },
  { name: 'Tuesday', bookings: 19 },
  { name: 'Wednesday', bookings: 15 },
  { name: 'Thursday', bookings: 21 },
  { name: 'Friday', bookings: 16 },
  { name: 'Saturday', bookings: 5 },
  { name: 'Sunday', bookings: 3 },
];

export const BookingsByDayChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-campus-primary">Room Bookings by Day</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingsByDay} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#1a73e8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
