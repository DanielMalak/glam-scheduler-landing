
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Role, RolePermissions, EmployeePermissions } from "@/types/admin";
import { rolesData } from "@/data/rolesData";
import { usePermissions } from "@/hooks/use-permissions";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const permissionSchema = z.object({
  create: z.boolean(),
  read: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  permissions: z.object({
    services: permissionSchema,
    clients: permissionSchema,
    schedule: permissionSchema,
    gallery: permissionSchema,
    employees: permissionSchema,
    inquiries: permissionSchema,
    constants: permissionSchema,
  }),
});

const defaultPermissions: EmployeePermissions = {
  create: false,
  read: false,
  update: false,
  delete: false,
};

const defaultFormValues: RolePermissions = {
  services: { ...defaultPermissions },
  clients: { ...defaultPermissions },
  schedule: { ...defaultPermissions },
  gallery: { ...defaultPermissions },
  employees: { ...defaultPermissions },
  inquiries: { ...defaultPermissions },
  constants: { ...defaultPermissions },
};

const AdminRoles = () => {
  const [roles, setRoles] = useState<Role[]>(rolesData);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  const permissions = usePermissions("employees"); // Using employees permissions for role management

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      permissions: defaultFormValues,
    },
  });

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    form.reset({
      name: role.name,
      permissions: role.permissions,
    });
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setRoleToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const deleteRole = () => {
    if (roleToDelete) {
      setRoles(roles.filter(role => role.id !== roleToDelete));
      toast({
        title: "Role deleted",
        description: "The role has been deleted successfully"
      });
      setIsDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingRole) {
      setRoles(currentRoles => 
        currentRoles.map(role => 
          role.id === editingRole.id 
            ? { ...role, ...values } 
            : role
        )
      );
      toast({
        title: "Role updated",
        description: "The role has been updated successfully"
      });
    } else {
      const newRole: Role = {
        id: Date.now().toString(),
        ...values,
      };
      setRoles([...roles, newRole]);
      toast({
        title: "Role added",
        description: "The new role has been added successfully"
      });
    }
    setIsDialogOpen(false);
    form.reset({
      name: "",
      permissions: defaultFormValues,
    });
    setEditingRole(null);
  };

  const openDialog = () => {
    form.reset({
      name: "",
      permissions: defaultFormValues,
    });
    setEditingRole(null);
    setIsDialogOpen(true);
  };

  const permissionModules = [
    { id: "services", label: "Services" },
    { id: "clients", label: "Clients" },
    { id: "schedule", label: "Schedule" },
    { id: "gallery", label: "Gallery" },
    { id: "employees", label: "Employees" },
    { id: "inquiries", label: "Inquiries" },
    { id: "constants", label: "Site Constants" },
  ];

  const permissionTypes = [
    { id: "create", label: "Create" },
    { id: "read", label: "Read" },
    { id: "update", label: "Update" },
    { id: "delete", label: "Delete" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Role Management</h1>
        {permissions.create && (
          <Button onClick={openDialog}>
            Add New Role
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {permissionModules.map(module => {
                      const modulePermissions = role.permissions[module.id as keyof RolePermissions];
                      const hasAnyPermission = Object.values(modulePermissions).some(p => p);
                      
                      return hasAnyPermission ? (
                        <Badge 
                          key={module.id}
                          variant="outline" 
                          className="bg-blue-50 text-blue-800 border-blue-300"
                        >
                          {module.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {permissions.update && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(role)}
                      >
                        Edit
                      </Button>
                    )}
                    {permissions.delete && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => confirmDelete(role.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {editingRole ? `Edit Role: ${editingRole.name}` : "Add New Role"}
            </DialogTitle>
            <DialogDescription>
              {editingRole
                ? "Update the role name and permissions."
                : "Create a new role with specific permissions."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Administrator" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <h3 className="text-lg font-medium mb-4">Permissions</h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Module</TableHead>
                        {permissionTypes.map(type => (
                          <TableHead key={type.id} className="text-center">
                            {type.label}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permissionModules.map(module => (
                        <TableRow key={module.id}>
                          <TableCell className="font-medium">{module.label}</TableCell>
                          {permissionTypes.map(type => (
                            <TableCell key={type.id} className="text-center">
                              <FormField
                                control={form.control}
                                name={`permissions.${module.id}.${type.id}` as any}
                                render={({ field }) => (
                                  <FormItem className="flex items-center justify-center h-full">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRole ? "Update Role" : "Create Role"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this role? Any employees assigned to this role will need to be reassigned.
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
              onClick={deleteRole}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRoles;

import { Badge } from "@/components/ui/badge";
