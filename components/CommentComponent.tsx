import { Comment } from "../globalVars/globals";

export default function CommentComponent(props: any) {
  const comment = props.comment as Comment;
  return (
    <div>
      <b>{comment.ownerName}</b>: {comment.content}
    </div>
  );
}
