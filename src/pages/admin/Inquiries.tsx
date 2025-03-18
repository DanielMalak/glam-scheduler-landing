
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Inquiry } from "@/types/admin";
import { inquiriesData } from "@/data/inquiriesData";
import { usePermissions } from "@/hooks/use-permissions";
import { format } from "date-fns";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>(inquiriesData);
  const [inquiryToDelete, setInquiryToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const { toast } = useToast();
  const permissions = usePermissions("inquiries");

  const confirmDelete = (id: string) => {
    setInquiryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const deleteInquiry = () => {
    if (inquiryToDelete) {
      setInquiries(inquiries.filter(inquiry => inquiry.id !== inquiryToDelete));
      toast({
        title: "Inquiry deleted",
        description: "The inquiry has been deleted successfully"
      });
      setIsDeleteDialogOpen(false);
      setInquiryToDelete(null);
    }
  };

  const viewInquiryDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailsDialogOpen(true);
  };

  const updateInquiryStatus = (id: string, status: "pending" | "active" | "resolved") => {
    setInquiries(inquiries.map(inquiry => {
      if (inquiry.id === id) {
        return { ...inquiry, status };
      }
      return inquiry;
    }));
    toast({
      title: "Status updated",
      description: `The inquiry status has been updated to ${status}`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "active":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Inquiries</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell>{format(inquiry.createdAt, "MMM d, yyyy")}</TableCell>
                <TableCell>{inquiry.name}</TableCell>
                <TableCell>{inquiry.email}</TableCell>
                <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewInquiryDetails(inquiry)}
                    >
                      View
                    </Button>
                    {permissions.update && (
                      <div className="flex space-x-1">
                        {inquiry.status !== "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300"
                            onClick={() => updateInquiryStatus(inquiry.id, "pending")}
                          >
                            Mark Pending
                          </Button>
                        )}
                        {inquiry.status !== "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300"
                            onClick={() => updateInquiryStatus(inquiry.id, "active")}
                          >
                            Mark Active
                          </Button>
                        )}
                        {inquiry.status !== "resolved" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300"
                            onClick={() => updateInquiryStatus(inquiry.id, "resolved")}
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    )}
                    {permissions.delete && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => confirmDelete(inquiry.id)}
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

      {/* Inquiry details dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500">Status</h3>
                <div className="mt-1">{getStatusBadge(selectedInquiry.status)}</div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">From</h3>
                <p className="mt-1">{selectedInquiry.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Contact</h3>
                <p className="mt-1">{selectedInquiry.email}</p>
                <p>{selectedInquiry.phone}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Date</h3>
                <p className="mt-1">{format(selectedInquiry.createdAt, "PPP")}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Message</h3>
                <p className="mt-1 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="flex space-x-2">
            {selectedInquiry && permissions.update && (
              <div className="flex-1 flex space-x-2">
                {selectedInquiry.status !== "pending" && (
                  <Button
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300"
                    onClick={() => {
                      updateInquiryStatus(selectedInquiry.id, "pending");
                      setIsDetailsDialogOpen(false);
                    }}
                  >
                    Mark Pending
                  </Button>
                )}
                {selectedInquiry.status !== "active" && (
                  <Button
                    variant="outline"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300"
                    onClick={() => {
                      updateInquiryStatus(selectedInquiry.id, "active");
                      setIsDetailsDialogOpen(false);
                    }}
                  >
                    Mark Active
                  </Button>
                )}
                {selectedInquiry.status !== "resolved" && (
                  <Button
                    variant="outline"
                    className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300"
                    onClick={() => {
                      updateInquiryStatus(selectedInquiry.id, "resolved");
                      setIsDetailsDialogOpen(false);
                    }}
                  >
                    Resolve
                  </Button>
                )}
              </div>
            )}
            <Button
              variant="secondary"
              onClick={() => setIsDetailsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this inquiry? This action cannot be undone.
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
              onClick={deleteInquiry}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInquiries;
