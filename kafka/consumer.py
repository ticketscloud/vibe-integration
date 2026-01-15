from __future__ import annotations

import asyncio
import json
import os
from pathlib import Path

from aiokafka import AIOKafkaConsumer, helpers

HOST = os.environ.get("KAFKA_HOST")
USER = os.environ.get("KAFKA_USER")
PASS = os.environ.get("KAFKA_PASS")
TOPIC = os.environ.get("KAFKA_TOPIC", "debug")

CAFILE = Path(__file__).parent / "YandexCA.pem"

if not (HOST and USER and PASS):
    raise EnvironmentError(
        "KAFKA_HOST, KAFKA_USER, and KAFKA_PASS must be set in environment variables.\n\n"
        "For example:\n"
        "export KAFKA_HOST='your_kafka_host'\n"
        "export KAFKA_USER='your_kafka_user'\n"
        "export KAFKA_PASS='your_kafka_pass'"
    )


async def main():
    consumer = AIOKafkaConsumer(
        TOPIC,
        bootstrap_servers=f"{HOST}:9091",
        security_protocol="SASL_SSL",
        sasl_mechanism="SCRAM-SHA-512",
        sasl_plain_username=USER,
        sasl_plain_password=PASS,
        ssl_context=helpers.create_ssl_context(cafile=CAFILE.as_posix()),
        auto_offset_reset="earliest",
        enable_auto_commit=True,
        group_id="debug",
        request_timeout_ms=30_000,
        session_timeout_ms=30_000,
        heartbeat_interval_ms=10_000,
    )

    await consumer.start()
    try:
        async for msg in consumer:
            headers = dict(msg.headers) if msg.headers else {}
            content_type = headers.get("content-type")
            value = (
                json.loads(msg.value)
                if content_type == b"application/json"
                else msg.value
            )

            print(
                f"Consumed message: topic={msg.topic} partition={msg.partition} offset={msg.offset} key={msg.key} value={value!r} headers={headers}"
            )
    finally:
        await consumer.stop()


if __name__ == "__main__":
    asyncio.run(main())
