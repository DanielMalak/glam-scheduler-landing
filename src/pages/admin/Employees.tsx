
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { employees, roles } from "@/data/employeesData";
import { services } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { usePermissions } from "@/hooks/use-permissions";
import { Employee, Role } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }).optional(),
  roleId: z.string(),
  serviceIds: z.array(z.string()).min(1, {
    message: "Please select at least one service.",
  }),
});

const AdminEmployees = () => {
  const [employeesList, setEmployeesList] = useState<Employee[]>(employees);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const permissions = usePermissions("employees");

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleId: "",
      serviceIds: [],
    },
  });

  // Reset form and open for editing
  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    form.reset({
      name: employee.name,
      email: employee.email,
      password: undefined, // Don't populate password for security
      roleId: employee.role.id,
      serviceIds: employee.serviceIds,
    });
  };

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const selectedRole = roles.find(role => role.id === values.roleId);
    
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Selected role not found",
        variant: "destructive"
      });
      return;
    }

    if (editingEmployee) {
      // Update existing employee
      setEmployeesList(currentEmployees => 
        currentEmployees.map(emp => 
          emp.id === editingEmployee.id 
            ? { 
                ...emp, 
                name: values.name,
                email: values.email,
                ...(values.password ? { password: values.password } : {}),
                role: selectedRole,
                serviceIds: values.serviceIds,
              } 
            : emp
        )
      );
      toast({
        title: "Employee updated",
        description: "The employee has been updated successfully"
      });
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: Date.now().toString(),
        name: values.name,
        email: values.email,
        password: values.password,
        role: selectedRole,
        serviceIds: values.serviceIds,
        createdAt: new Date()
      };
      setEmployeesList([...employeesList, newEmployee]);
      toast({
        title: "Employee added",
        description: "New employee has been added successfully"
      });
    }
    
    setEditingEmployee(null);
    form.reset({
      name: "",
      email: "",
      password: "",
      roleId: "",
      serviceIds: [],
    });
  };

  // Handle employee deletion
  const confirmDelete = (id: string) => {
    setEmployeeToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (employeeToDelete) {
      setEmployeesList(employeesList.filter(emp => emp.id !== employeeToDelete));
      toast({
        title: "Employee deleted",
        description: "The employee has been removed"
      });
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employeesList.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employees Management</h1>
        {permissions.create && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new employee.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter employee name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={editingEmployee ? "Leave empty to keep current password" : "Enter password"} 
                            type="password" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The role determines what permissions the employee has.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceIds"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Services</FormLabel>
                          <FormDescription>
                            Select which services this employee can perform
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {services.map((service) => (
                            <FormField
                              key={service.id}
                              control={form.control}
                              name="serviceIds"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={service.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(service.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, service.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== service.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {service.name}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">{editingEmployee ? "Update Employee" : "Add Employee"}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Joined</TableHead>
                  {(permissions.update || permissions.delete) && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={permissions.update || permissions.delete ? 6 : 5} className="text-center py-6 text-muted-foreground">
                      No employees found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {employee.role.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        {employee.serviceIds.length > 0 ? (
                          <span className="text-muted-foreground">
                            {employee.serviceIds.length} services
                          </span>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(employee.createdAt).toLocaleDateString()}
                      </TableCell>
                      {(permissions.update || permissions.delete) && (
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {permissions.update && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleEdit(employee)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>Edit Employee</DialogTitle>
                                    <DialogDescription>
                                      Update employee details.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                      <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                              <Input placeholder="Enter employee name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                              <Input placeholder="email@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                              <Input 
                                                placeholder="Leave empty to keep current password" 
                                                type="password" 
                                                {...field} 
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="roleId"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select 
                                              onValueChange={field.onChange} 
                                              defaultValue={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                {roles.map(role => (
                                                  <SelectItem key={role.id} value={role.id}>
                                                    {role.name}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                            <FormDescription>
                                              The role determines what permissions the employee has.
                                            </FormDescription>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="serviceIds"
                                        render={() => (
                                          <FormItem>
                                            <div className="mb-4">
                                              <FormLabel className="text-base">Services</FormLabel>
                                              <FormDescription>
                                                Select which services this employee can perform
                                              </FormDescription>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                              {services.map((service) => (
                                                <FormField
                                                  key={service.id}
                                                  control={form.control}
                                                  name="serviceIds"
                                                  render={({ field }) => {
                                                    return (
                                                      <FormItem
                                                        key={service.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                      >
                                                        <FormControl>
                                                          <Checkbox
                                                            checked={field.value?.includes(service.id)}
                                                            onCheckedChange={(checked) => {
                                                              return checked
                                                                ? field.onChange([...field.value, service.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                      (value) => value !== service.id
                                                                    )
                                                                  )
                                                            }}
                                                          />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                          {service.name}
                                                        </FormLabel>
                                                      </FormItem>
                                                    )
                                                  }}
                                                />
                                              ))}
                                            </div>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <DialogFooter>
                                        <DialogClose asChild>
                                          <Button type="button" variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Update Employee</Button>
                                      </DialogFooter>
                                    </form>
                                  </Form>
                                </DialogContent>
                              </Dialog>
                            )}
                            
                            {permissions.delete && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-destructive"
                                onClick={() => confirmDelete(employee.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this employee? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEmployees;
