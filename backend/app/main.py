from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .logic import get_rds_message, get_rdr_message
from fastapi.responses import JSONResponse
from .routes import options_routes

app = FastAPI()

# Permitir CORS para el frontend en Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas de opciones
app.include_router(options_routes.router, prefix="/api")


@app.get("/rds")
def get_rds():
    ok, msg = get_rds_message()
    return JSONResponse(content={"ok": ok, "message": msg})


@app.get("/rdr")
def rdr():
    return {"message": get_rdr_message()}
