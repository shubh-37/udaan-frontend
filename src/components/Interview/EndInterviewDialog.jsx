import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  
  export function EndInterviewDialog({ open, onClose }) {
    const handleEndInterview = () => {
      localStorage.removeItem('interview_id');
      window.location.href = "/";
    }
  
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End Interview Session?</DialogTitle>
            <DialogDescription>
              Are you sure you want to end this interview session? Any unsaved responses will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleEndInterview}>
              End Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  
  