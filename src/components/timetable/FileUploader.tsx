
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Trash2, Upload } from 'lucide-react';

type TimetablePDF = {
  id: string;
  name: string;
  course: string;
  campus: string;
  uploadDate: string;
  size: string;
  downloadUrl: string;
};

export const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [course, setCourse] = useState('');
  const [campus, setCampus] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<TimetablePDF[]>([
    {
      id: '1',
      name: 'Computer Science Semester 1.pdf',
      course: 'Computer Science',
      campus: 'Main Campus',
      uploadDate: '2025-05-10',
      size: '1.2 MB',
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'Engineering Year 2.pdf',
      course: 'Engineering',
      campus: 'South Campus',
      uploadDate: '2025-05-08',
      size: '2.5 MB',
      downloadUrl: '#'
    }
  ]);
  
  const { toast } = useToast();
  
  const courses = [
    'Computer Science', 
    'Engineering', 
    'Business Administration', 
    'Medicine', 
    'Law'
  ];
  
  const campuses = [
    'Main Campus', 
    'South Campus', 
    'West Campus', 
    'North Campus'
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };
  
  const handleUpload = () => {
    if (!file || !course || !campus) {
      toast({
        title: "Missing information",
        description: "Please select a file, course, and campus.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, here you would upload the file to your storage
    // For this demo, we'll just add it to our local state
    const newFile: TimetablePDF = {
      id: `file-${Date.now()}`,
      name: file.name,
      course,
      campus,
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      downloadUrl: '#'
    };
    
    setUploadedFiles([...uploadedFiles, newFile]);
    
    // Reset form
    setFile(null);
    setCourse('');
    setCampus('');
    
    // Show success message
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been uploaded for ${course} at ${campus}.`
    });
  };
  
  const handleDelete = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    toast({
      title: "File removed",
      description: "The timetable PDF has been removed."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Timetable PDF</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="file">Timetable PDF</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="file" 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange}
                  className="flex-1"
                />
              </div>
              {file && (
                <p className="text-xs text-gray-500">
                  Selected file: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campus">Campus</Label>
              <Select value={campus} onValueChange={setCampus}>
                <SelectTrigger id="campus">
                  <SelectValue placeholder="Select campus" />
                </SelectTrigger>
                <SelectContent>
                  {campuses.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleUpload} disabled={!file || !course || !campus}>
            <Upload className="mr-2 h-4 w-4" />
            Upload PDF
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Timetables</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead className="hidden md:table-cell">Course</TableHead>
                <TableHead className="hidden md:table-cell">Campus</TableHead>
                <TableHead className="hidden md:table-cell">Upload Date</TableHead>
                <TableHead className="hidden md:table-cell">Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedFiles.length > 0 ? (
                uploadedFiles.map(file => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-blue-500" />
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="md:hidden text-xs text-gray-500">
                            {file.course} • {file.campus}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{file.course}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{file.campus}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                        {file.uploadDate}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{file.size}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" asChild>
                          <a href={file.downloadUrl} download>
                            <FileText className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-500"
                          onClick={() => handleDelete(file.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No timetable PDFs have been uploaded yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
