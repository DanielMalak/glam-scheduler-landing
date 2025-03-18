
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
import { useToast } from "@/hooks/use-toast";
import { SiteConstants } from "@/types/admin";
import { constantsData } from "@/data/constantsData";
import { usePermissions } from "@/hooks/use-permissions";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, MapPin, Phone, Link, Mail, ExternalLink } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  value: z.string().min(1, {
    message: "Value is required.",
  }),
  type: z.enum(["text", "url", "phone", "address", "coordinates"]),
});

const AdminConstants = () => {
  const [constants, setConstants] = useState<SiteConstants[]>(constantsData);
  const [editingConstant, setEditingConstant] = useState<SiteConstants | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const permissions = usePermissions("constants");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: "",
      type: "text",
    },
  });

  const handleEdit = (constant: SiteConstants) => {
    setEditingConstant(constant);
    form.reset({
      name: constant.name,
      value: constant.value,
      type: constant.type,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingConstant) {
      setConstants(currentConstants => 
        currentConstants.map(constant => 
          constant.id === editingConstant.id 
            ? { ...constant, ...values } 
            : constant
        )
      );
      toast({
        title: "Constant updated",
        description: "The site constant has been updated successfully"
      });
    } else {
      const newConstant: SiteConstants = {
        id: Date.now().toString(),
        ...values,
      };
      setConstants([...constants, newConstant]);
      toast({
        title: "Constant added",
        description: "The new site constant has been added successfully"
      });
    }
    setIsDialogOpen(false);
    form.reset();
    setEditingConstant(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "coordinates":
        return <MapPin className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "url":
        return <Link className="h-4 w-4" />;
      case "address":
        return <MapPin className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const openDialog = () => {
    form.reset({
      name: "",
      value: "",
      type: "text",
    });
    setEditingConstant(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Site Constants</h1>
        {permissions.create && (
          <Button onClick={openDialog}>
            Add New Constant
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {constants.map((constant) => (
              <TableRow key={constant.id}>
                <TableCell className="font-medium">{constant.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getTypeIcon(constant.type)}
                    <span className="ml-2">
                      {constant.type === "url" ? (
                        <a 
                          href={constant.value} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          {constant.value}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      ) : (
                        constant.value
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="capitalize">{constant.type}</span>
                </TableCell>
                <TableCell>
                  {permissions.update && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(constant)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingConstant ? "Edit Site Constant" : "Add New Site Constant"}
            </DialogTitle>
            <DialogDescription>
              {editingConstant
                ? "Update the details of the site constant."
                : "Add a new site constant to your website."}
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
                      <Input placeholder="Business Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the value"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <select
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                        {...field}
                      >
                        <option value="text">Text</option>
                        <option value="url">URL</option>
                        <option value="phone">Phone</option>
                        <option value="address">Address</option>
                        <option value="coordinates">Coordinates</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingConstant ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminConstants;
