#!/usr/bin/env python3

from __future__ import annotations

import asyncio
import json
import os
import random
from datetime import UTC, datetime
from pathlib import Path

from aiokafka import AIOKafkaProducer, helpers

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
    producer = AIOKafkaProducer(
        bootstrap_servers=f"{HOST}:9091",
        security_protocol="SASL_SSL",
        sasl_mechanism="SCRAM-SHA-512",
        sasl_plain_username=USER,
        sasl_plain_password=PASS,
        ssl_context=helpers.create_ssl_context(cafile=CAFILE.as_posix()),
        key_serializer=lambda v: v.encode("utf-8") if isinstance(v, str) else v,
        value_serializer=lambda v: v.encode("utf-8") if isinstance(v, str) else v,
        acks="all",
        request_timeout_ms=30_000,
    )

    await producer.start()
    print(f"Started Kafka producer for topic '{TOPIC}' at {HOST}:9091")

    try:
        while True:
            key = f"key-{datetime.now(tz=UTC).isoformat()}"
            value = json.dumps(
                {"data": random.randint(1, 100), "message": "Debug message from aiokafka producer"}
            )

            md = await producer.send_and_wait(
                TOPIC,
                key=key,
                value=value,
                # Headers example:
                # Version: 1.0 (supporting versioning of your message schema)
                # Encoding: utf-8
                # Source: <your application name>
                # Content-Type:
                #  - application/json (for JSON payloads)
                #  - application/x-protobuf (for Protobuf payloads)
                headers=[
                    ("schema-version", b"0.0"),
                    ("application-id", b"debug"),
                    ("content-type", b"application/json"),
                ],
            )

            print(f"Sent to topic={md.topic} partition={md.partition} offset={md.offset} key={key}")

            await asyncio.sleep(1e-3)

    finally:
        await producer.stop()


if __name__ == "__main__":
    asyncio.run(main())

# ruff: noqa: S311, T201
