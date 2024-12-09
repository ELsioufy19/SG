import authRouter from "./auth/auth.router.js";
import catRouter from "./category/category.router.js";
import userRouter from "./user/user.router.js";


const appRouter = (app)=>{

  app.use("/reg", authRouter);
  app.use("/category", catRouter);
  app.use("/user", userRouter);
  
  app.all("*", (req, res, next) =>
    next(new Error("page not found", { cause: 404 }))
);

app.use((err, req, res, next) =>
  res.status(err.cause || 500).json({
    sucess: false,
    message: err.message,
    ...(process.env.MODE == "DEV" ? { stack: err.stack } : ""),
  })
);
}

export default appRouter;