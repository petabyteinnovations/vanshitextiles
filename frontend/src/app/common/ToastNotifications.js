export let ToastSuccess = async (msg) => {
  let { toast } = await import("react-hot-toast");
  toast.success(msg);
};

export let ToastError = async (msg) => {
  let { toast } = await import("react-hot-toast");
  toast.error(msg);
};
