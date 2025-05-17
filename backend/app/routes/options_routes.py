import sqlite3
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
import os
from pathlib import Path

router = APIRouter()

# Ruta al archivo de base de datos
DB_PATH = Path(__file__).parent.parent / "data" / "options.db"


def ensure_db_exists():
    """Asegura que la base de datos exista con datos de ejemplo si no existe"""
    if not os.path.exists(DB_PATH.parent):
        os.makedirs(DB_PATH.parent)

    # Si existe, eliminarla para recrearla
    if os.path.exists(DB_PATH):
        try:
            os.remove(DB_PATH)
            print(f"Base de datos eliminada: {DB_PATH}")
        except Exception as e:
            print(f"No se pudo eliminar la base de datos: {e}")
            return False

    # Crear la base de datos con datos de ejemplo
    try:
        conn = sqlite3.connect(str(DB_PATH))
        cursor = conn.cursor()

        # Crear tablas
        cursor.execute("""
        CREATE TABLE fuentes (
            id TEXT PRIMARY KEY,
            nombre TEXT NOT NULL
        )
        """)

        cursor.execute("""
        CREATE TABLE clases (
            id TEXT PRIMARY KEY,
            nombre TEXT NOT NULL
        )
        """)

        cursor.execute("""
        CREATE TABLE versiones (
            id TEXT PRIMARY KEY,
            nombre TEXT NOT NULL
        )
        """)

        # Insertar datos de ejemplo
        fuentes = [
            ("HAWKneo", "HAWKneo"),
            ("Tools", "Tools"),
        ]

        clases = [
            ("TEM", "TEM"),
            ("MC01", "MC01_RF"),
            ("MC02", "MC02_FF"),
            ("MC03", "MC03_LW"),
            ("MC04", "MC04_LW"),
            ("MC05", "MC05_LW"),
            ("MC06", "MC06_LW"),
            ("MC07", "MC07_LW"),
        ]

        versiones = [
            ("beta", "Beta"),
            ("alpha", "Alpha"),
        ]

        cursor.executemany("INSERT INTO fuentes VALUES (?, ?)", fuentes)
        cursor.executemany("INSERT INTO clases VALUES (?, ?)", clases)
        cursor.executemany("INSERT INTO versiones VALUES (?, ?)", versiones)

        conn.commit()
        conn.close()

        print(f"Base de datos creada en: {DB_PATH}")
        return True
    except Exception as e:
        print(f"Error al crear la base de datos: {e}")
        return False


ensure_db_exists()


@router.post("/options/reset-database", response_model=Dict[str, Any])
async def reset_database():
    """Endpoint para reiniciar la base de datos"""
    try:
        success = ensure_db_exists()
        if success:
            return {
                "success": True,
                "message": "Base de datos reiniciada correctamente",
            }
        else:
            raise HTTPException(
                status_code=500, detail="Error al reiniciar la base de datos"
            )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error al reiniciar la base de datos: {str(e)}"
        )


@router.get("/options/fuentes", response_model=List[Dict[str, str]])
async def get_fuentes():
    try:
        conn = sqlite3.connect(str(DB_PATH))
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute("SELECT id as value, nombre as label FROM fuentes")
        results = [dict(row) for row in cursor.fetchall()]

        conn.close()
        return results
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error al obtener fuentes: {str(e)}"
        )


@router.get("/options/clases", response_model=List[Dict[str, str]])
async def get_clases():
    try:
        conn = sqlite3.connect(str(DB_PATH))
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute("SELECT id as value, nombre as label FROM clases")
        results = [dict(row) for row in cursor.fetchall()]

        conn.close()
        return results
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error al obtener clases: {str(e)}"
        )


@router.get("/options/versiones", response_model=List[Dict[str, str]])
async def get_versiones():
    try:
        conn = sqlite3.connect(str(DB_PATH))
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute("SELECT id as value, nombre as label FROM versiones")
        results = [dict(row) for row in cursor.fetchall()]

        conn.close()
        return results
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error al obtener versiones: {str(e)}"
        )
