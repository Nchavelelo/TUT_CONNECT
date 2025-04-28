
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { maintenanceRequests } from "@/data/mockData";

const COLORS = ['#1a73e8', '#4285f4', '#fbbc04', '#34a853', '#ea4335'];

export const MaintenancePriorityChart = () => {
  const maintenancePriorityCount = maintenanceRequests.reduce((acc, request) => {
    acc[request.priority] = (acc[request.priority] || 0) + 1;
    return acc;
  }, {});

  const maintenancePriorityData = Object.entries(maintenancePriorityCount).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-campus-primary">Maintenance by Priority</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={maintenancePriorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {maintenancePriorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
