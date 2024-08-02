jQuery("#frm").validate({
  rules: {
    n: "required",
    e: "required",
    p: {
      required: true,
      minlength: 8,
    },
    cp: {
      required: true,
      minlength: 8,
    },
  },
  messages: {
    n: "please enter your name",
    e: "please enter your email",
    p: {
      required: "please enter your password",
      minlength: "password  must be 8 char long",
    },
    cp: {
      required: "please enter same password",
      minlength: "password  must be 8 char long",
    },
  },
});
