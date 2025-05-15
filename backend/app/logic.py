import datetime
import time
import random


def get_rds_message():
    time.sleep(1)
    n = random.randint(0, 1)
    now = datetime.datetime.now().time()
    return (
        (
            True,
            f" Son las {now}. \n Has pulsado modulo HNS. Mensaje obtenido desde el backend.",
        )
        if n == 0
        else (False, f"Error a las {now}")
    )


def get_rdr_message():
    return f"Has pulsado HNR. Hoy es {datetime.datetime.now().date().strftime('%d-%m-%Y')}. \n Mensaje personalizado para RDR desde el backend."
