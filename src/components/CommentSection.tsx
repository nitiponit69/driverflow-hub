import { useState } from "react";
import { Comment } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string, author: string) => void;
}

export const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("Admin");

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment, author);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">ความคิดเห็น</h3>
      </div>

      <ScrollArea className="h-[200px] rounded-lg border p-4 bg-muted/30">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            ยังไม่มีความคิดเห็น
          </p>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-background p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm text-primary">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.date).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-sm text-foreground">{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="space-y-2">
        <Textarea
          placeholder="เพิ่มความคิดเห็น..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          className="resize-none"
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="gap-2">
            <Send className="w-4 h-4" />
            ส่งความคิดเห็น
          </Button>
        </div>
      </div>
    </div>
  );
};
