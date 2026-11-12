import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export type ToastMessage = {
  id: number;
  text: string;
};

type AppToastProps = {
  message: ToastMessage | null;
  onClose: () => void;
};

export function AppToast({ message, onClose }: AppToastProps) {
  return (
    <ToastContainer position="bottom-end" className="p-3 position-fixed">
      {message && (
        <Toast
          key={message.id}
          onClose={onClose}
          autohide
          delay={3000}
          bg="dark"
        >
          <Toast.Body className="text-white">{message.text}</Toast.Body>
        </Toast>
      )}
    </ToastContainer>
  );
}
